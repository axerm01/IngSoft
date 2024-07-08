// src/Scene.js
import React, { useState } from 'react';
import './Scene.css';

const Scene = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sceneType, setSceneType] = useState('scelta');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlesceneTypeChange = (e) => {
    setSceneType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sceneData = {
      title: title,
      description: description,
      sceneType: sceneType,
    };

    // Log del JSON prima dell'invio
    console.log('Invio del JSON:', JSON.stringify(sceneData));

    // Invia la richiesta POST all'API per creare una nuova scena
    fetch('http://localhost:5000/scenes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sceneData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Scena creata con successo!');
        // Pulisce i campi del form dopo la creazione
        setTitle('');
        setDescription('');
        setSceneType('scelta');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Errore nella creazione della scena');
      });
  };

  return (
    <div className="scene-container">
      <h1>Crea una nuova scena</h1>
      <form className="scene-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titolo:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrizione:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo di scena:</label>
          <select id="type" value={sceneType} onChange={handlesceneTypeChange}>
            <option value="scelta">Scelta</option>
            <option value="indovinello">Indovinello</option>
            <option value="finale">Finale</option>
          </select>
        </div>
        <button type="submit" className="create-button">Crea Scena</button>
      </form>
    </div>
  );
};

export default Scene;
