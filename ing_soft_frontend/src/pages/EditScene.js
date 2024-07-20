// src/EditScene.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditScene.css'; // Stili CSS per il componente

const EditScene = () => {
  const navigate = useNavigate();
  const { slug } = useParams(); // Utilizza useParams per ottenere lo slug dal URL

  // Estrai il titolo dallo slug nell'URL
  const title = slug.replace(/-/g, ' '); // Se necessario, converte il trattino in spazi nel titolo

  const [description, setDescription] = useState('');
  const [sceneType, setSceneType] = useState('');

  useEffect(() => {
    // Funzione per recuperare i dati della scena dal server
    async function fetchSceneData() {
      try {
        const response = await fetch(`http://localhost:5000/scenes/${title}`);
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati della scena');
        }
        const data = await response.json();
        setDescription(data.description);
        setSceneType(data.sceneType);
      } catch (error) {
        console.error('Errore:', error);
        // Gestione dell'errore: potresti mostrare un messaggio all'utente o reindirizzare a una pagina di errore
      }
    }

    fetchSceneData(); // Chiamata iniziale per caricare i dati
  }, [title]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpdate = () => {
    // Simula l'aggiornamento della descrizione sul server (PUT request)
    // Nella realtà, sostituisci con una chiamata effettiva al backend
    fetch(`http://localhost:5000/scenes/update/${title}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nell\'aggiornamento della descrizione della scena');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Descrizione aggiornata con successo!');
      })
      .catch((error) => {
        console.error('Errore:', error);
        alert('Errore nell\'aggiornamento della descrizione della scena');
      });
  };

  const handleLogout = () => {
    // Gestione del logout
    // Puoi implementare la logica per il logout qui, come rimuovere il token JWT dal localStorage, ecc.
    navigate('/login'); // Reindirizza alla pagina di login dopo il logout
  };

  return (
    <div className="edit-scene">
      <header className="edit-header">
        <h1>Edit Scena</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="edit-content">
        <div className="form-group">
          <label htmlFor="title">Titolo:</label>
          <input type="text" id="title" value={title} readOnly />
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
          <label htmlFor="sceneType">Tipo di Scena:</label>
          <input type="text" id="sceneType" value={sceneType} readOnly />
        </div>
        <button onClick={handleUpdate} className="update-button">Aggiorna</button>
      </div>
    </div>
  );
};

export default EditScene;
