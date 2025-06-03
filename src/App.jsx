import { useState } from 'react';
import CadastroUsuario from './componentes/CadastroUsuario';
import ListaUsuarios from './componentes/ListaUsuarios';
import './styles/global.css'; // Importação confirmada

function App() {
  const [abaAtiva, setAbaAtiva] = useState('cadastro');

  return (
    <div className="container">
      {/* Barra de navegação */}
      <div className="botoes-navegacao">
        <button
          onClick={() => setAbaAtiva('cadastro')}
          className={abaAtiva === 'cadastro' ? 'ativo' : ''}
        >
          Cadastrar Usuário
        </button>
        <button
          onClick={() => setAbaAtiva('lista')}
          className={abaAtiva === 'lista' ? 'ativo' : ''}
        >
          Ver Usuários
        </button>
      </div>

      {/* Conteúdo */}
      <main>
        {abaAtiva === 'cadastro' ? <CadastroUsuario /> : <ListaUsuarios />}
      </main>
    </div>
  );
}

export default App;