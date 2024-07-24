import React, { useState, useEffect } from 'react';
import '../style/RiddleScene.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RiddleScene = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storyTitle = params.get('storyTitle');
  const username = params.get('username');

  const [allScenes, setAllScenes] = useState([]);
  const [riddleScenes, setRiddleScenes] = useState([]);
  const [riddles, setRiddles] = useState({});

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

    const fetchRiddleScenes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/scenes/story/${encodeURIComponent(storyTitle)}/author/${encodeURIComponent(username)}/indovinello`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRiddleScenes(data);
        console.log('Riddle scenes fetched:', data);
      } catch (error) {
        console.error('Error fetching riddle scenes:', error);
      }
    };

    fetchAllScenes();
    fetchRiddleScenes();
  }, [storyTitle, username]);

  const handleChange = (sceneId, e) => {
    const { name, value } = e.target;
    setRiddles(prevRiddles => ({
      ...prevRiddles,
      [sceneId]: {
        ...prevRiddles[sceneId],
        [name]: value
      }
    }));
  };

  const handleSaveRiddles = async () => {
    try {
      const response = await fetch('http://localhost:5001/riddles/add-scenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenes: riddleScenes.map(scene => ({
            authorName: username,
            storyTitle: storyTitle,
            sceneTitle: scene.title,
            riddle_text: riddles[scene._id]?.riddle_text || '',
            answer: riddles[scene._id]?.answer || '',
            correct_scene: riddles[scene._id]?.correct_scene || '',
            incorrect_scene: riddles[scene._id]?.incorrect_scene || ''
          }))
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Riddles saved:', data);
      navigate(`/choice?username=${encodeURIComponent(username)}&storyTitle=${encodeURIComponent(storyTitle)}`)    } catch (error) {
      console.error('Error saving riddles:', error);
    }
  };  

  return (
    <div className="riddle-scene-container">
      <h1 className="riddle-scene-title">Indovinelli per la Storia: {storyTitle}</h1>

      {riddleScenes.map((scene) => (
        <div key={scene._id} className="riddle-scene-item">
          <div className="riddle-scene-header">{scene.title}</div>
          <div className="riddle-scene-content">
            <div className="riddle-scene-form-group">
              <label htmlFor={`riddle_text_${scene._id}`}>Testo dell'Indovinello:</label>
              <textarea
                name="riddle_text"
                id={`riddle_text_${scene._id}`}
                value={riddles[scene._id]?.riddle_text || ''}
                onChange={(e) => handleChange(scene._id, e)}
              />
            </div>
            <div className="riddle-scene-form-group">
              <label htmlFor={`answer_${scene._id}`}>Risposta:</label>
              <textarea
                name="answer"
                id={`answer_${scene._id}`}
                value={riddles[scene._id]?.answer || ''}
                onChange={(e) => handleChange(scene._id, e)}
              />
            </div>
            <div className="riddle-scene-form-group">
              <label htmlFor={`correct_scene_${scene._id}`}>Scena Corretta:</label>
              <select
                name="correct_scene"
                id={`correct_scene_${scene._id}`}
                value={riddles[scene._id]?.correct_scene || ''}
                onChange={(e) => handleChange(scene._id, e)}
              >
                <option value="">Seleziona una scena</option>
                {allScenes.map(sceneOption => (
                  <option key={sceneOption._id} value={sceneOption.title}>{sceneOption.title}</option>
                ))}
              </select>
            </div>
            <div className="riddle-scene-form-group">
              <label htmlFor={`incorrect_scene_${scene._id}`}>Scena Sbagliata:</label>
              <select
                name="incorrect_scene"
                id={`incorrect_scene_${scene._id}`}
                value={riddles[scene._id]?.incorrect_scene || ''}
                onChange={(e) => handleChange(scene._id, e)}
              >
                <option value="">Seleziona una scena</option>
                {allScenes.map(sceneOption => (
                  <option key={sceneOption._id} value={sceneOption.title}>{sceneOption.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <button className="prosegui-button" onClick={handleSaveRiddles}>Prosegui</button>
    </div>
  );
};

export default RiddleScene;
