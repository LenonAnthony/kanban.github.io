import React, { useState, useCallback } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

interface LoginFormState {
  username: string;
  password: string;
}

interface LoginProps {
  onLogin: (credentials: LoginFormState) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formState, setFormState] = useState<LoginFormState>({
    username: '',
    password: ''
  });

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleRegisterClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/register', { board_code: formState.username });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    try {
      // Aqui também estamos usando formState.username, que é atualizado pelo handleInputChange
      const response = await axios.post('http://localhost:3000/api/login', {  board_code: `"${formState.username}"` });
      
      // Handle successful login
      console.log(response.data);
      // Call the passed onLogin prop with the returned data or status
      onLogin(response.data);
    } catch (error) {
      // Handle login errors
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="username">Código do Quadro:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
        />
        <div className={styles.buttonContainer}>
          <button type="submit">Entrar</button>
          <button type="button" onClick={handleRegisterClick}>Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;