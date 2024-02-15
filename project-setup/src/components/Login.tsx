import React, { useState, useCallback } from 'react';
import styles from './Login.module.css';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(formState);
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;