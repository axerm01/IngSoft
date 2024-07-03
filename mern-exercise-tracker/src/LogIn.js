// src/Login.js
import React, { useState } from 'react';
import './LogIn.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Effettua la richiesta GET per verificare se l'utente esiste
    fetch(`http://localhost:5000/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          // Placeholder per la logica di autenticazione effettiva
          console.log('Utente trovato:', data);
          alert('Login avvenuto con successo!');
        } else {
          alert('Utente non trovato, per favore registrati.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Errore nel login');
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Effettua la richiesta POST per la registrazione
    fetch(`http://localhost:5000/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
