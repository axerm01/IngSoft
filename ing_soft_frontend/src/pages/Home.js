import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Funzione per caricare le storie dall'API
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:5001/stories'); // Assumendo che questa sia l'API per ottenere le storie
        if (!response.ok) {
          throw new Error('Errore nel recupero delle storie');
        }
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Errore:', error);
      }
    };

    fetchStories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const startGame = async (storyTitle, author) => {
    try {
      // Recupera il titolo della scena iniziale
      const sceneResponse = await fetch(`http://localhost:5001/stories/initialScene?authorId=${encodeURIComponent(author)}&title=${encodeURIComponent(storyTitle)}`);
      if (!sceneResponse.ok) {
        throw new Error('Errore nel recupero della scena iniziale');
      }
      const initialSceneTitle = await sceneResponse.json();
      //console.log(initialSceneTitle);
      // Verifica se esiste già un gioco
      const checkResponse = await fetch('http://localhost:5001/games/exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storyTitle, author, playerName: username }),
      });
      console.log(checkResponse.status);
      if (checkResponse.status === 404) { // Game not found, create a new game
        const createResponse = await fetch('http://localhost:5001/games/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storyTitle, author, initialSceneTitle, playerName: username, objects: [] }),
        });

        if (!createResponse.ok) {
          console.log({storyTitle, author, initialSceneTitle, playerName: username, objects: [] })
          throw new Error('Errore nella creazione del gioco');
        }

        await createResponse.json();
      }

      // Navigate to the game page
      navigate(`/game?username=${encodeURIComponent(username)}&story=${encodeURIComponent(storyTitle)}&author=${encodeURIComponent(author)}`);
    } catch (error) {
      console.error('Errore nella gestione del gioco:', error); // Aggiungi messaggio di errore più dettagliato
      alert('Errore nella gestione del gioco: ' + error.message); // Mostra il messaggio di errore all'utente
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="titleHome">Benvenuto in AGAFabula, {username}!</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="button-container">
        <Link to={`/item?username=${encodeURIComponent(username)}`} className="home-button">Oggetti</Link>
        <Link to={`/editScene?username=${encodeURIComponent(username)}`} className="home-button">Modifica Scene</Link>
        <Link to={`/createStory?username=${encodeURIComponent(username)}`} className="home-button">Crea Storia</Link>
      </div>
      <div className="stories-container">
        {stories.map(story => (
          <div key={story.id} className="story-card">
            <h2>{story.title}</h2>
            <p>Autore: {story.authorId}</p>
            <button className="play-button" onClick={() => startGame(story.title, story.authorId, username)}>Gioca</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
