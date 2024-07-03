// src/Login.js
import React, { useState } from 'react';
import './LogIn.css';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual authentication logic
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Effettua la richiesta POST per la registrazione
    fetch('/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password: password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Registrazione avvenuta con successo!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Errore nella registrazione');
      });
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">LogIn</button>
        <button type="button" className="signin-button" onClick={handleRegister}>Registrati</button>
      </form>
    </div>
  );
};

export default LogIn;
