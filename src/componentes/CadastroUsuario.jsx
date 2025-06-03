import { useState } from 'react';

function CadastroUsuario() {
  const [form, setForm] = useState({ 
    id: Date.now(),
    nome: '', 
    email: '', 
    senha: '', 
    tipo: 'comum',
    dataCadastro: new Date().toISOString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.nome || !form.email || !form.senha) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (usuarios.some(u => u.email === form.email)) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    const novoUsuario = { ...form, id: Date.now() };
    localStorage.setItem('usuarios', JSON.stringify([...usuarios, novoUsuario]));
    
    alert('✔️ Usuário cadastrado com sucesso!');
    setForm({ 
      id: Date.now(),
      nome: '', 
      email: '', 
      senha: '', 
      tipo: 'comum',
      dataCadastro: new Date().toISOString()
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-cadastro animated-form">
        <h2><i className="fas fa-user-edit"></i> Cadastro de Usuário</h2>
        
        <div className="form-group">
          <label>
            <i className="fas fa-user"></i> Nome Completo:
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm({...form, nome: e.target.value})}
              required
              placeholder="Digite o nome completo"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            <i className="fas fa-envelope"></i> E-mail:
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
              placeholder="exemplo@email.com"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            <i className="fas fa-lock"></i> Senha:
            <input
              type="password"
              value={form.senha}
              onChange={(e) => setForm({...form, senha: e.target.value})}
              minLength="6"
              required
              placeholder="Mínimo 6 caracteres"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            <i className="fas fa-user-tag"></i> Tipo de Usuário:
            <select
              value={form.tipo}
              onChange={(e) => setForm({...form, tipo: e.target.value})}
            >
              <option value="comum">Usuário Comum</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
        </div>

        <button type="submit" className="botao-primario">
          <i className="fas fa-save"></i> Cadastrar Usuário
        </button>
      </form>
    </div>
  );
}

export default CadastroUsuario;