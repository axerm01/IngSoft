import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../style/Game.css';

const Game = () => {
  const [searchParams] = useSearchParams();
  const story = searchParams.get('story');
  const author = searchParams.get('author');
  const [scene, setScene] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScene = async () => {
      try {
        const response = await fetch(`http://localhost:5001/stories/initialScene?authorId=${encodeURIComponent(author)}&title=${encodeURIComponent(story)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Errore nel recupero della scena: ${response.status} - ${errorText}`);
          throw new Error(`Errore nel recupero della scena: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Dati scena iniziale ricevuti:', data); // Log dei dati ricevuti
        if (data) {
          setScene(data); // Imposta la scena se data è valida
        }
      } catch (error) {
        console.error('Errore:', error);
        setError(error.message);
      }
    };

    fetchScene();
  }, [story, author]);

  useEffect(() => {
    const fetchDescription = async () => {
      if (scene) {
        try {
          const response = await fetch('http://localhost:5001/scenes/sceneDescription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              storyTitle: story, 
              authorName: author, 
              title: scene 
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Errore nel recupero della descrizione: ${response.status} - ${errorText}`);
            throw new Error(`Errore nel recupero della descrizione: ${response.status} - ${errorText}`);
          }

          const descriptionData = await response.json();
          console.log('Dati descrizione scena ricevuti:', descriptionData); // Log dei dati ricevuti
          if (descriptionData) {
            setDescription(descriptionData);
          }
        } catch (error) {
          console.error('Errore:', error);
          setError(error.message);
        }
      }
    };

    fetchDescription();
  }, [scene, story, author]);

  return (
    <div className="game-container">
      {error && <p className="error-message">Errore: {error}</p>}
      {scene ? (
        <div className="scene-mask" style={{ width: '60%' }}>
          <h2>{scene}</h2>
          <h4>{description || 'Descrizione non disponibile'}</h4>
        </div>
      ) : (
        <p className="loading-message">Caricamento...</p>
      )}
    </div>
  );
};

export default Game;
