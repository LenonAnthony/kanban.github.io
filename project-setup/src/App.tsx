import './App.css';
// import { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
// import Login from './components/Login';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Esta função normalmente envolveria a verificação de credenciais contra um banco de dados
  // const handleLogin = () => {
    // Simula um login bem-sucedido
    //setIsAuthenticated(true);
  //};

  return (
    <div className="App">
        <KanbanBoard />
    </div>
  );
}

export default App;