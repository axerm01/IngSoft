// src/Home.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../style/Home.css';


const Home = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(true); // Stato di autenticazione
    const handleLogout = () => {
    setAuthenticated(false);
    navigate('/LogIn');
  };
    return (
      <div className="home-container">
        <header className="home-header">
          <h1 className="title">Benvenuto in AGAFabula</h1>
          <button className="logout-button" onClick={handleLogout} >Logout</button>
        </header>
        <div className="button-container">
          <Link to="/play" className="home-button">Gioca</Link>
          <Link to="/stories" className="home-button">Configurazione</Link>
        </div>
      </div>
    );
  };

export default Home;
