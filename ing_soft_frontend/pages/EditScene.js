import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/EditScene.css'; // Stili CSS per il componente

const EditScene = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stories, setStories] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [selectedStory, setSelectedStory] = useState('');
  const [selectedScene, setSelectedScene] = useState('');
  const [description, setDescription] = useState('');
  const [sceneType, setSceneType] = useState('');

  // Funzione per ottenere il parametro dalla query string
  const getQueryParam = (param) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

  const username = getQueryParam('username');

  useEffect(() => {
    // Funzione per recuperare le storie dell'utente dal server
    async function fetchStories() {
      try {
        const response = await fetch(`http://localhost:5001/stories/user/${username}`);
        if (!response.ok) {
          throw new Error('Errore nel recupero delle storie');
        }
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Errore:', error);
      }
    }

    fetchStories(); // Chiamata iniziale per caricare le storie
  }, [username]);

  useEffect(() => {
    if (selectedStory) {
      // Funzione per recuperare le scene della storia selezionata
      async function fetchScenes() {
        try {
          const response = await fetch(`http://localhost:5001/scenes/story/${selectedStory}/author/${username}`);
          if (!response.ok) {
            throw new Error('Errore nel recupero delle scene');
          }
          const data = await response.json();
          setScenes(data);
        } catch (error) {
          console.error('Errore:', error);
        }
      }

      fetchScenes(); // Chiamata per caricare le scene della storia selezionata
    }
  }, [selectedStory, username]);

  const handleStoryChange = (e) => {
    setSelectedStory(e.target.value);
    setSelectedScene('');
    setDescription('');
    setSceneType('');
  };

  const handleSceneChange = (e) => {
    const sceneTitle = e.target.value;
    setSelectedScene(sceneTitle);

    const scene = scenes.find(scene => scene.title === sceneTitle);
    if (scene) {
      setDescription(scene.description);
      setSceneType(scene.sceneType);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpdate = async () => {
    if (!selectedScene) {
      alert('Seleziona una scena da aggiornare');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/scenes/edit/${username}/${selectedStory}/${selectedScene}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Errore nell\'aggiornamento della descrizione della scena');
      }

      const data = await response.json();
      console.log('Success:', data);
      alert('Descrizione aggiornata con successo!');
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nell\'aggiornamento della descrizione della scena');
    }
  };

  const handleLogout = () => {
    // Gestione del logout
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
          <label htmlFor="stories">Seleziona Storia:</label>
          <select id="stories" value={selectedStory} onChange={handleStoryChange}>
            <option value="">--Seleziona una storia--</option>
            {stories.map(story => (
              <option key={story._id} value={story.title}>{story.title}</option>
            ))}
          </select>
        </div>
        {selectedStory && (
          <div className="form-group">
            <label htmlFor="scenes">Seleziona Scena:</label>
            <select id="scenes" value={selectedScene} onChange={handleSceneChange}>
              <option value="">--Seleziona una scena--</option>
              {scenes.map(scene => (
                <option key={scene._id} value={scene.title}>{scene.title}</option>
              ))}
            </select>
          </div>
        )}
        {selectedScene && (
          <>
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
            <button onClick={handleUpdate} className="update-button">Aggiorna Descrizione</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditScene;
