// src/pages/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="titleHome">Benvenuto in AGAFabula</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="button-container">
        <Link to="/item" className="home-button">Oggetti</Link>
        <Link to="/createStory" className="home-button">Configurazione</Link>
      </div>
    </div>
  );
};

export default Home;
