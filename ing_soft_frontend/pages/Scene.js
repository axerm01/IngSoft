import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../style/Scene.css';

const Scene = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storyTitle = params.get('storyTitle');
  const username = params.get('username');
  const navigate = useNavigate(); // Usa useNavigate per ottenere la funzione di navigazione

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sceneType, setSceneType] = useState('scelta');
  const [requiredObject, setRequiredObject] = useState('');
  const [foundObject, setFoundObject] = useState('');
  const [objects, setObjects] = useState([]);
  const [isTitleUnique, setIsTitleUnique] = useState(true);

  useEffect(() => {
    const fetchItemsByUsername = async (username) => {
      try {
        const response = await fetch(`http://localhost:5001/items/user/${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setObjects(data);
        console.log('Objects fetched:', data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItemsByUsername(username);
  }, [username]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSceneTypeChange = (e) => {
    setSceneType(e.target.value);
  };

  const handleRequiredObjectChange = (e) => {
    setRequiredObject(e.target.value);
  };

  const handleFoundObjectChange = (e) => {
    setFoundObject(e.target.value);
  };

  const checkSceneExistence = async () => {
    try {
      const response = await fetch(`http://localhost:5001/scenes/check?storyTitle=${encodeURIComponent(storyTitle)}&title=${encodeURIComponent(title)}&authorName=${encodeURIComponent(username)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setIsTitleUnique(!data.exists);
      return data.exists;
    } catch (error) {
      console.error('Error checking scene existence:', error);
      alert('Errore durante il controllo della disponibilità del titolo della scena');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exists = await checkSceneExistence();
    if (exists) {
      alert('Esiste già una scena con questo titolo per questa storia');
      return;
    }

    const sceneData = {
      authorName: username,
      storyTitle: storyTitle,
      title: title,
      description: description,
      sceneType: sceneType,
      requiredObject: requiredObject,
      foundObject: foundObject,
    };

    try {
      const addResponse = await fetch('http://localhost:5001/scenes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sceneData),
      });
      if (!addResponse.ok) {
        throw new Error('Network response was not ok ' + addResponse.statusText);
      }
      const addData = await addResponse.json();
      console.log('Success:', addData);
      alert('Scena creata con successo!');
      setTitle('');
      setDescription('');
      setSceneType('scelta');
      setRequiredObject('');
      setFoundObject('');
      setIsTitleUnique(true);

    } catch (error) {
      console.error('Error:', error);
      alert('Errore nella creazione della scena');
    }
  };
  const handleProceed = async () => {
    try {
      const response = await fetch(`http://localhost:5001/scenes/check/story/${encodeURIComponent(storyTitle)}/author/${encodeURIComponent(username)}/finale`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (data.exists) {
        navigate(`/firstScene?username=${encodeURIComponent(username)}&storyTitle=${encodeURIComponent(storyTitle)}`);
      } else {
        alert('Devi creare almeno una scena finale per procedere.');
      }
    } catch (error) {
      console.error('Error checking final scene existence:', error);
      alert('Errore durante il controllo della disponibilità della scena finale');
    }
  };
  

  return (
    <div className="scene-container">
      <h1 className="titoloStoria1">Storia: {storyTitle}</h1>
      <h2 className="titoloStoria1">Autore: {username}</h2>
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
          {!isTitleUnique && <p className="error-message">Esiste già una scena con questo titolo per questa storia</p>}
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
          <select id="type" value={sceneType} onChange={handleSceneTypeChange}>
            <option value="scelta">Scelta</option>
            <option value="indovinello">Indovinello</option>
            <option value="finale">Finale</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="requiredObject">Oggetto Richiesto:</label>
          <select
            id="requiredObject"
            value={requiredObject}
            onChange={handleRequiredObjectChange}
          >
            <option value="">Nessuno</option>
            {objects.map((object, idx) => (
              <option key={idx} value={object.name}>
                {object.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="foundObject">Oggetto Trovato:</label>
          <select
            id="foundObject"
            value={foundObject}
            onChange={handleFoundObjectChange}
          >
            <option value="">Nessuno</option>
            {objects.map((object, idx) => (
              <option key={idx} value={object.name}>
                {object.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="create-button">Salva Scena</button>
      </form>
      {}
      <button className="proceed-button" onClick={handleProceed}>Prosegui</button>
    </div>
  );
};

export default Scene;
