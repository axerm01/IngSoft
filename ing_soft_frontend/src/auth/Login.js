// src/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../style/LogIn.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password }, { withCredentials: true });
      const { token } = response.data;
      login(token);
      navigate('/home');
    } catch (error) {
      setError('Invalid credentials');
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
