import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();
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

  const startGame = (storyTitle, author) => {
    navigate(`/visitorGame?&story=${encodeURIComponent(storyTitle)}&author=${encodeURIComponent(author)}`);
  };

  return (
    <div className="home-container">
      <div className="stories-container">
        {stories.map(story => (
          <div key={story.id} className="story-card">
            <h2>{story.title}</h2>
            <p>Autore: {story.authorId}</p>
            <button className="play-button" onClick={() => startGame(story.title, story.authorId)}>Gioca</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
