import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Aqui para armazenar erros
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reseta o erro a cada nova tentativa de login
    setError('');
  
    // Envia o login para o backend
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  

    console.log('Resposta do servidor:', data); // Verifique a resposta

    if (response.ok) {
      // Armazena o token JWT no localStorage
      localStorage.setItem('token', data.token);
      alert('Login bem-sucedido!');
      navigate('/shopping-list');
    } else {
      // Exibe uma mensagem de erro
      setError(data.message || 'Credenciais inválidas.');
    }
  };

  return (
    <div className="login-container">
      <h2>Bem-vindos à loja de compras de Eldória!</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>LOGIN</h3>
        {error && <p className="error">{error}</p>} {/* Exibe o erro aqui */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
        <button type="submit" className="login-button">ENTRAR</button>
      </form>
    </div>
  );
}

export default LoginForm;
