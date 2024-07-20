// src/SceneList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SceneList.css';

const SceneList = () => {
  const [scenes, setScenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera tutte le scene dal server
    fetch('http://localhost:5000/scenes')
      .then(response => response.json())
      .then(data => setScenes(data))
      .catch(error => console.error('Error fetching scenes:', error));
  }, []);

  const handleLogout = () => {
    // Logica di logout, se necessario
    // Reindirizza alla schermata home
    navigate('/');
  };

  const handleCreateScene = () => {
    navigate('/Scene');
  };

  const handleEditClick = (title) => {
    navigate(`/EditScene/${title}`);
  };

  return (
    <div className="scene-list-container">
      <header className="header">
      <h1>Lista delle Scene</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <button onClick={handleCreateScene} className="create-scene-button">Crea Scena</button>
      {scenes.map((scene) => (
        <div key={scene._id} className="scene-item">
          <h2>{scene.title}</h2>
          <p>{scene.description}</p>
          <button onClick={() => handleEditClick(scene.title)}>Modifica</button>
        </div>
      ))}
    </div>
  );
};

export default SceneList;
