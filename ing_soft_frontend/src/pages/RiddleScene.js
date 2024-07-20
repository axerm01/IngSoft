import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/RiddleScene.css';

const RiddleScene = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storyTitle = params.get('storyTitle');
  const username = params.get('username');

  const [scenes, setScenes] = useState([]);
  const [riddles, setRiddles] = useState([]);

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/scenes/story/${encodeURIComponent(storyTitle)}/author/${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScenes(data.filter(scene => scene.type === 'indovinello'));
        console.log('Scenes fetched:', data);
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    const fetchRiddles = async () => {
      try {
        const response = await fetch('http://localhost:5001/riddles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRiddles(data.filter(riddle => riddle.storyTitle === storyTitle && riddle.authorName === username));
        console.log('Riddles fetched:', data);
      } catch (error) {
        console.error('Error fetching riddles:', error);
      }
    };

    fetchScenes();
    fetchRiddles();
  }, [storyTitle, username]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setRiddles(prevRiddles => {
      const newRiddles = [...prevRiddles];
      newRiddles[index] = {
        ...newRiddles[index],
        [name]: value
      };
      return newRiddles;
    });
  };

  const handleSaveRiddle = async (riddle) => {
    try {
      const response = await fetch('http://localhost:5001/riddles/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riddle),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Riddle added:', result);
    } catch (error) {
      console.error('Error adding riddle:', error);
    }
  };

  return (
    <div className="riddle-scene-container">
      <h1 className="title">Indovinelli per la Storia: {storyTitle}</h1>
      <h2 className="author">Autore: {username}</h2>

      <div className="riddle-list">
        {scenes.map((scene, index) => (
          <div key={index} className="riddle-item">
            <h4>{scene.title}</h4>
            <div className="form-group">
              <label htmlFor={`riddle_text_${index}`}>Testo dell'Indovinello:</label>
              <textarea
                name="riddle_text"
                id={`riddle_text_${index}`}
                value={riddles[index]?.riddle_text || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`answer_${index}`}>Risposta:</label>
              <textarea
                name="answer"
                id={`answer_${index}`}
                value={riddles[index]?.answer || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`correct_scene_${index}`}>Scena Corretta:</label>
              <select
                name="correct_scene"
                id={`correct_scene_${index}`}
                value={riddles[index]?.correct_scene || ''}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Seleziona una scena</option>
                {scenes.map(scene => (
                  <option key={scene.title} value={scene.title}>{scene.title}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`incorrect_scene_${index}`}>Scena Sbagliata:</label>
              <select
                name="incorrect_scene"
                id={`incorrect_scene_${index}`}
                value={riddles[index]?.incorrect_scene || ''}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Seleziona una scena</option>
                {scenes.map(scene => (
                  <option key={scene.title} value={scene.title}>{scene.title}</option>
                ))}
              </select>
            </div>
            <button className="save-riddle-button" onClick={() => handleSaveRiddle(riddles[index])}>
              Salva Indovinello
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiddleScene;
