import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/Scene.css';

const Scene = () => {
  const { storyTitle } = useParams(); // Ottieni il parametro storyTitle dall'URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sceneType, setSceneType] = useState('scelta');
  const [requiredObject, setRequiredObject] = useState('');
  const [foundObject, setFoundObject] = useState('');
  const [objects, setObjects] = useState([]);
  const [isTitleUnique, setIsTitleUnique] = useState(true); // Stato per verificare se il titolo è univoco

  useEffect(() => {
    // Recupera gli oggetti dall'API REST o da altre fonti in base alle tue esigenze
    fetch('http://localhost:5001/items')
      .then(response => response.json())
      .then(data => {
        setObjects(data);
        console.log('Objects fetched:', data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controlla se il titolo della scena è univoco prima di inviare i dati
    try {
      console.log('Checking if scene title is unique...');
      const response = await fetch(`http://localhost:5001/scenes/check?storyId=${storyTitle}&title=${encodeURIComponent(title)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Check response:', data);
      setIsTitleUnique(!data.exists);

      if (data.exists) {
        // Se il titolo non è univoco, esci senza salvare
        alert('Esiste già una scena con questo titolo per questa storia');
        return;
      }
    } catch (error) {
      console.error('Error checking scene existence:', error);
      alert('Errore durante il controllo della disponibilità del titolo della scena');
      return;
    }

    const sceneData = {
      storyId: storyTitle,
      title: title,
      description: description,
      sceneType: sceneType,
      requiredObject: requiredObject,
      foundObject: foundObject,
    };

    console.log('Sending scene data:', sceneData);

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
      setIsTitleUnique(true); // Resetta lo stato di unicità del titolo dopo il salvataggio
    } catch (error) {
      console.error('Error:', error);
      alert('Errore nella creazione della scena');
    }
  };

  return (
    <div className="scene-container">
      <h1 className="titoloStoria1">Storia: {storyTitle}</h1>
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
      <button className="proceed-button">Prosegui</button>
    </div>
  );
};

export default Scene;
