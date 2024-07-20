import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StoriesList from '../components/StoriesList';
import CreateStoryDialog from '../components/CreateStoryDialog';

const StoriesPage = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/stories/`, {
                withCredentials: true // Permette l'invio dei cookie con la richiesta
            });
            setStories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the stories!', error);
            setLoading(false);
        }
    };

    const handleCreateStory = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleStoryCreated = () => {
        fetchStories(); // Aggiorna l'elenco delle storie dopo la creazione
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Stories</h1>
                <button onClick={handleCreateStory} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Create Story
                </button>
            </div>
            <StoriesList stories={stories} />
            <CreateStoryDialog
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
                onStoryCreated={handleStoryCreated}
            />
        </div>
    );
};

export default StoriesPage;
