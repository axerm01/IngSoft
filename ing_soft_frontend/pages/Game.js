import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../style/Game.css';

const Game = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const story = searchParams.get('story');
  const author = searchParams.get('author');
  const [scene, setScene] = useState(null);
  const [choices, setChoices] = useState([]);
  const [description, setDescription] = useState(null);
  const [objects, setObjects] = useState([]);
  const [type, setType] = useState(null);
  const [itemFound, setItemFound] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Stato per il messaggio di errore
  const [riddleAnswer, setRiddleAnswer] = useState(''); // Stato per la risposta dell'indovinello
  const [riddleText, setRiddleText] = useState(''); // Stato per il testo dell'indovinello

  useEffect(() => {
    const fetchScene = async () => {
      try {
        const response = await fetch('http://localhost:5001/games/getGame', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storyTitle: story, author, playerName: username }),
        });

        if (!response.ok) {
          throw new Error('Error fetching scene');
        }

        const data = await response.json();
        if (data.initialSceneTitle) {
          setScene(data.initialSceneTitle);
          setObjects(data.objects || []);
          //console.log('Scene title:', data.initialSceneTitle);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchScene();
  }, [story, author, username]);

  useEffect(() => {
    const fetchChoices = async () => {
      if (scene) {
        try {
          const response = await fetch('http://localhost:5001/choices/getChoices', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ storyTitle: story, sceneTitle: scene, authorName: author }),
          });

          if (!response.ok) {
            throw new Error('Error fetching choices');
          }

          const choicesData = await response.json();
          console.log('Choices Data:', choicesData);
          setChoices(choicesData);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchChoices();
  }, [scene, story, author]);

  useEffect(() => {
    const fetchDescription = async () => {
      if (scene) {
        try {
          await updateInitialScene(); // Aggiorna la scena nel db
          const response = await fetch('http://localhost:5001/scenes/sceneDescription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ storyTitle: story, authorName: author, title: scene }),
          });

          if (!response.ok) {
            throw new Error('Error fetching description');
          }

          const descriptionData = await response.json();
          console.log('Description:', descriptionData);
          setDescription(descriptionData);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchDescription();
  }, [story, author, scene]);

  useEffect(() => {
    const fetchItemFound = async () => {
      if (scene) {
        try {
          const response = await fetch('http://localhost:5001/scenes/itemFound', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ storyTitle: story, authorName: author, title: scene }),
          });

          if (!response.ok) {
            throw new Error('Error fetching item found');
          }

          const itemFoundData = await response.json();
          console.log('Item Found:', itemFoundData);

          if (itemFoundData && !objects.includes(itemFoundData)) {
            setItemFound(itemFoundData);
            setShowPopup(true);

            try {
              const addItemResponse = await fetch('http://localhost:5001/games/addItem', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  storyTitle: story,
                  author: author,
                  playerName: username,
                  newItem: itemFoundData,
                }),
              });

              if (!addItemResponse.ok) {
                throw new Error('Error adding item to inventory');
              }

              const addItemResult = await addItemResponse.json();
              console.log(addItemResult);

              setObjects(prevObjects => [...prevObjects, itemFoundData]);

            } catch (error) {
              console.error('Error:', error);
            }
          } else {
            setShowPopup(false);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchItemFound();
  }, [story, author, scene]);

  useEffect(() => {
    const fetchType = async () => {
      if (scene) {
        try {
          const response = await fetch('http://localhost:5001/scenes/sceneType', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ storyTitle: story, authorName: author, title: scene }),
          });

          if (!response.ok) {
            throw new Error('Error fetching type');
          }

          const typeData = await response.json();
          console.log('Type:', typeData);
          setType(typeData);

          // Se la scena è un indovinello, ottenere il testo dell'indovinello
          if (typeData === 'indovinello') {
            const riddleResponse = await fetch('http://localhost:5001/riddles/getRiddle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ storyTitle: story, authorName: author, sceneTitle: scene }),
            });

            if (!riddleResponse.ok) {
              throw new Error('Error fetching riddle');
            }

            const riddleData = await riddleResponse.json();
            setRiddleText(riddleData.riddle_text);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchType();
  }, [story, author, scene]);

  const handleChoiceClick = async (choice) => {
    try {
      const response = await fetch('http://localhost:5001/scenes/itemNeeded', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storyTitle: story, authorName: author, title: choice.sceneTitle }),
      });
  
      if (!response.ok) {
        throw new Error('Error fetching required object');
      }
  
      const data = await response.json();
      console.log('Oggetto necessario per la scena:', choice.sceneTitle, 'è:', data.requiredObject);
  
      if (data.requiredObject === "" || objects.includes(data.requiredObject)) {
        setScene(choice.sceneTitle);
        setErrorMessage('');
      } else {
        setErrorMessage(`Non possiedi l'oggetto richiesto (${data.requiredObject}) per accedere a questa scena.`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleRiddleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/riddles/checkAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storyTitle: story, authorName: author, sceneTitle: scene, answer: riddleAnswer }),
      });

      if (!response.ok) {
        throw new Error('Error checking riddle answer');
      }

      const data = await response.json();
      setScene(data.nextScene);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setItemFound(null);
  };

  const updateInitialScene = async () => {
    try {
      const response = await fetch('http://localhost:5001/games/updateScene', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyTitle: story,
          author,
          playerName: username,
          newSceneTitle: scene
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error updating initial scene');
      }
  
      const result = await response.json();
      console.log('Initial scene updated:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="game-container">
      {scene ? (
        <div className="scene-mask" style={{ width: '60%' }}>
          <h2>{scene}</h2>
          <h4>{description}</h4>
          {type === 'scelta' ? (
            <div className="choices-container">
              {choices.map((choice, index) => (
                <button
                  key={index}
                  className="choice-button"
                  onClick={() => handleChoiceClick(choice)}
                >
                  {choice.sceneTitle}
                </button>
              ))}
            </div>
          ) : type === 'indovinello' ? (
            <div className="riddle-container">
              <p>{riddleText}</p>
              <form onSubmit={handleRiddleSubmit}>
                <textarea
                  value={riddleAnswer}
                  onChange={(e) => setRiddleAnswer(e.target.value)}
                  placeholder="Enter your answer here"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : null}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {showPopup && itemFound && (
            <div className="popup">
              <p>Object found: {itemFound}</p>
              <button onClick={closePopup} className="close-popup-button">Close</button>
            </div>
          )}
        </div>
      ) : (
        <p className="napoli">Loading...</p>
      )}
    </div>
  );
};

export default Game;
