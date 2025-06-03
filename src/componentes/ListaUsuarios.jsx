import { useState, useEffect } from 'react';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const carregarUsuarios = () => {
      const dados = JSON.parse(localStorage.getItem('usuarios')) || [];
      setUsuarios(dados);
    };
    carregarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExcluir = (id) => {
    if (window.confirm('⚠️ Tem certeza que deseja excluir este usuário?')) {
      const novaLista = usuarios.filter(u => u.id !== id);
      localStorage.setItem('usuarios', JSON.stringify(novaLista));
      setUsuarios(novaLista);
    }
  };

  return (
    <div className="lista-container animated-list">
      <h2><i className="fas fa-users"></i> Usuários Cadastrados</h2>
      
      <div className="search-container">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="campo-busca"
        />
      </div>

      {usuariosFiltrados.length > 0 ? (
        <div className="tabela-wrapper">
          <table className="tabela-usuarios">
            <thead>
              <tr>
                <th><i className="fas fa-id-card"></i> ID</th>
                <th><i className="fas fa-user"></i> Nome</th>
                <th><i className="fas fa-envelope"></i> E-mail</th>
                <th><i className="fas fa-user-tag"></i> Tipo</th>
                <th><i className="fas fa-calendar-alt"></i> Cadastro</th>
                <th><i className="fas fa-cog"></i> Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>#{usuario.id.toString().slice(-4)}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`badge ${usuario.tipo === 'admin' ? 'admin' : 'comum'}`}>
                      {usuario.tipo === 'admin' ? 'Administrador' : 'Comum'}
                    </span>
                  </td>
                  <td>{new Date(usuario.dataCadastro).toLocaleDateString()}</td>
                  <td>
                    <button 
                      onClick={() => handleExcluir(usuario.id)}
                      className="botao-excluir"
                    >
                      <i className="fas fa-trash-alt"></i> Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="sem-registros">
          <i className="fas fa-exclamation-circle"></i>
          <p>Nenhum usuário cadastrado ainda</p>
        </div>
      )}
    </div>
  );
}

export default ListaUsuarios;