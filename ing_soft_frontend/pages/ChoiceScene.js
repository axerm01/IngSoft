import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/ChoiceScene.css';

const ChoiceScene = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storyTitle = params.get('storyTitle');
  const username = params.get('username');

  const [allScenes, setAllScenes] = useState([]);
  const [choiceScenes, setChoiceScenes] = useState([]);
  const [choices, setChoices] = useState({});

  useEffect(() => {
    const fetchAllScenes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/scenes/story/${encodeURIComponent(storyTitle)}/author/${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllScenes(data);
        console.log('All scenes fetched:', data);
      } catch (error) {
        console.error('Error fetching all scenes:', error);
      }
    };

    const fetchChoiceScenes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/scenes/story/${encodeURIComponent(storyTitle)}/author/${encodeURIComponent(username)}/scelta`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChoiceScenes(data);
        console.log('Choice scenes fetched:', data);

        // Inizializza le scelte con due voci vuote per ogni scena
        const initialChoices = {};
        data.forEach(scene => {
          initialChoices[scene._id] = ['', ''];
        });
        setChoices(initialChoices);
      } catch (error) {
        console.error('Error fetching choice scenes:', error);
      }
    };

    fetchAllScenes();
    fetchChoiceScenes();
  }, [storyTitle, username]);

  const handleChange = (sceneId, index, e) => {
    const { value } = e.target;
    setChoices(prevChoices => {
      const updatedChoices = { ...prevChoices };
      if (!updatedChoices[sceneId]) {
        updatedChoices[sceneId] = [];
      }
      updatedChoices[sceneId][index] = value;
      return updatedChoices;
    });
  };

  const handleAddDestination = (sceneId) => {
    setChoices(prevChoices => {
      const updatedChoices = { ...prevChoices };
      if (!updatedChoices[sceneId]) {
        updatedChoices[sceneId] = [];
      }
      updatedChoices[sceneId] = [...updatedChoices[sceneId], ''];
      return updatedChoices;
    });
  };

  const handleSaveChoices = async () => {
    try {
      const response = await fetch('http://localhost:5001/choices/add-scenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenes: choiceScenes.map(scene => ({
            authorName: username,
            storyTitle: storyTitle,
            sceneTitle: scene.title,
            choices: choices[scene._id]?.map(choice => ({ sceneTitle: choice })) || []
          }))
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Choices saved:', data);
      navigate(`/home?username=${encodeURIComponent(username)}`)    
    } catch (error) {
      console.error('Error saving choices:', error);
    }
  };

  return (
    <div className="choice-scene-container">
      <h1 className="choice-scene-title">Scelte per la Storia: {storyTitle}</h1>

      {choiceScenes.map((scene) => (
        <div key={scene._id} className="choice-scene-item">
          <div className="choice-scene-header">{scene.title}</div>
          <div className="choice-scene-content">
            {choices[scene._id] && choices[scene._id].map((choice, index) => (
              <div key={index} className="choice-scene-form-group">
                <label htmlFor={`choice_${scene._id}_${index}`}>Destinazione:</label>
                <select
                  name="choice"
                  id={`choice_${scene._id}_${index}`}
                  value={choice}
                  onChange={(e) => handleChange(scene._id, index, e)}
                >
                  <option value="">Seleziona una scena</option>
                  {allScenes.map(sceneOption => (
                    <option key={sceneOption._id} value={sceneOption.title}>{sceneOption.title}</option>
                  ))}
                </select>
              </div>
            ))}
            <button className="aggiungi-destinazione-button" onClick={() => handleAddDestination(scene._id)}>Aggiungi Destinazione</button>
          </div>
        </div>
      ))}

      <button className="prosegui-button" onClick={handleSaveChoices}>Prosegui</button>
    </div>
  );
};

export default ChoiceScene;
