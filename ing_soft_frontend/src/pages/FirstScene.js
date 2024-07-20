import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/Scene.css';

const FirstScene = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const storyTitle = params.get('storyTitle');
  const username = params.get('username');

  const [scenes, setScenes] = useState([]);
  const [selectedScene, setSelectedScene] = useState('');

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/scenes/story/${encodeURIComponent(storyTitle)}/author/${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScenes(data);
        if (data.length > 0) {
          setSelectedScene(data[0].title); // Imposta la prima scena come selezionata di default
        }
        console.log('Scenes fetched:', data);
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    fetchScenes();
  }, [storyTitle, username]);

  const handleSceneChange = (e) => {
    setSelectedScene(e.target.value);
  };

  const handleContinue = async () => {
    try {
      const response = await fetch('http://localhost:5001/stories/updateInitialScene', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyTitle: storyTitle,
          authorId: username,
          newInitialSceneTitle: selectedScene
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Initial scene updated:', result);

      // Naviga alla pagina dei dettagli della scena
      navigate(`/riddle?username=${encodeURIComponent(username)}&storyTitle=${encodeURIComponent(storyTitle)}`);
    } catch (error) {
      console.error('Error updating initial scene:', error);
    }
  };

  return (
    <div className="scene-container">
      <h1 className="title">Scegli la tua scena iniziale per la storia: {storyTitle}</h1>
      <h2 className="author">Autore: {username}</h2>
      <div className="scene-dropdown">
        <label htmlFor="sceneSelect">Seleziona la scena:</label>
        <select id="sceneSelect" value={selectedScene} onChange={handleSceneChange}>
          {scenes.map((scene, index) => (
            <option key={index} value={scene.title}>
              {scene.title}
            </option>
          ))}
        </select>
      </div>
      {selectedScene && (
        <div className="selected-scene">
          <h3>Scena selezionata: {selectedScene}</h3>
        </div>
      )}
      <button className="continue-button" onClick={handleContinue}>
        Prosegui
      </button>
    </div>
  );
};

export default FirstScene;
