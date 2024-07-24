// src/auth/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/LogIn.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGuestLogin = () => {
    navigate('/visitorHome');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === 'Login successful') {
          login();
          navigate(`/home?username=${encodeURIComponent(username)}`);
        } else {
          setError(data.message);
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Benvenuto in AGAFabula</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleGuestLogin} className="login-button">Entra come ospite</button>
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
        <Link to="/register" className="signin-link">
          <button className="go-to-signin-button">Non sei registrato? Registrati!</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
