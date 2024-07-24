import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate e useLocation
import '../style/CreateStory.css';

const CreateStory = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const navigate = useNavigate(); // Usa useNavigate per navigare
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  const handleTitleChange = (e) => {
    setStoryTitle(e.target.value);
  };

  const handleProceed = () => {
    const authorId = username; // Utente fisso
    const initialSceneTitle = null; // Scena iniziale null

    fetch('http://localhost:5001/stories/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: storyTitle, authorId, initialSceneTitle }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Story added successfully:', data);
        alert('Storia aggiunta con successo!');
        navigate(`/createScene?username=${encodeURIComponent(username)}&storyTitle=${encodeURIComponent(storyTitle)}`);
      })
      .catch(error => {
        console.error('Error adding story:', error);
        alert('Errore durante l\'aggiunta della storia');
      });
  };

  return (
    <div className="create-story-container">
      <h1 className='titoloStoria'>Benvenuto nella creazione di una storia</h1>
      <div className="input-section">
        <label htmlFor="storyTitle">Inserisci il titolo della storia:</label>
        <textarea
          id="storyTitle"
          value={storyTitle}
          onChange={handleTitleChange}
          rows={1}
          cols={50}
          required
        />
      </div>
      <button className="proceed-button" onClick={handleProceed}>
        Prosegui
      </button>
    </div>
  );
};

export default CreateStory;