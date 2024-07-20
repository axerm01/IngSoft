// src/pages/Home.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="titleHome">Benvenuto in AGAFabula, {username}!</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="button-container">
        <Link to={`/item?username=${encodeURIComponent(username)}`} className="home-button">Oggetti</Link>
        <Link to={`/createStory?username=${encodeURIComponent(username)}`} className="home-button">Configurazione</Link>
        <Link to={`/createScene?username=${encodeURIComponent(username)}`} className="home-button">Scene</Link>
        <Link to={`/createStory?username=${encodeURIComponent(username)}`} className="home-button">Crea Storia</Link>
      </div>
    </div>
  );
};

export default Home;
