import React, { useState } from 'react';
import '../style/CreateStory.css';

const Scene = () => {
    const [scenes, setScenes] = useState([]);
    const [storyTitle, setStoryTitle] = useState('');
    const [sceneTitle, setSceneTitle] = useState('');

    const addNewScene = () => {
        setScenes([
            ...scenes,
            {
                id: scenes.length,
                title: sceneTitle,
                description: '',
                sceneType: 'scelta',
                requiredObject: null,
                foundObject: null,
            },
        ]);
        setSceneTitle('');
    };

    const handleSceneChange = (id, field, value) => {
        const updatedScenes = scenes.map((scene) =>
            scene.id === id ? { ...scene, [field]: value } : scene
        );
        setScenes(updatedScenes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Invia la richiesta POST all'API per creare una nuova scena
        fetch(apiUrl + '/scenes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ storyTitle, scenes }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                alert('Storia creata con successo!');
                // Pulisce le scene dopo la creazione
                setScenes([]);
                setStoryTitle('');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Errore nella creazione della storia');
            });
    };

    return (
        <div className="scene-container">
            <h1 className="scene-title">Crea una nuova storia</h1>
            <input
                type="text"
                className="story-title-input"
                placeholder="Inserisci il titolo della storia"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                required
            />
            <form onSubmit={handleSubmit}>
                {scenes.map((scene) => (
                    <div key={scene.id} className="scene-card">
                        <div className="form-group">
                            <label htmlFor={`title-${scene.id}`}>Titolo Scena:</label>
                            <input
                                type="text"
                                id={`title-${scene.id}`}
                                value={scene.title}
                                onChange={(e) =>
                                    handleSceneChange(scene.id, 'title', e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`description-${scene.id}`}>Descrizione:</label>
                            <textarea
                                id={`description-${scene.id}`}
                                value={scene.description}
                                onChange={(e) =>
                                    handleSceneChange(scene.id, 'description', e.target.value)
                                }
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`type-${scene.id}`}>Tipo di scena:</label>
                            <select
                                id={`type-${scene.id}`}
                                value={scene.sceneType}
                                onChange={(e) =>
                                    handleSceneChange(scene.id, 'sceneType', e.target.value)
                                }
                            >
                                <option value="scelta">Scelta</option>
                                <option value="indovinello">Indovinello</option>
                                <option value="finale">Finale</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`requiredObject-${scene.id}`}>Oggetto Richiesto:</label>
                            <select
                                id={`requiredObject-${scene.id}`}
                                value={scene.requiredObject}
                                onChange={(e) =>
                                    handleSceneChange(scene.id, 'requiredObject', e.target.value)
                                }
                            >
                                <option value={null}>Nessuno</option>
                                <option value="oggetto1">Oggetto 1</option>
                                <option value="oggetto2">Oggetto 2</option>
                                <option value="oggetto3">Oggetto 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`foundObject-${scene.id}`}>Oggetto Trovato:</label>
                            <select
                                id={`foundObject-${scene.id}`}
                                value={scene.foundObject}
                                onChange={(e) =>
                                    handleSceneChange(scene.id, 'foundObject', e.target.value)
                                }
                            >
                                <option value={null}>Nessuno</option>
                                <option value="oggetto1">Oggetto 1</option>
                                <option value="oggetto2">Oggetto 2</option>
                                <option value="oggetto3">Oggetto 3</option>
                            </select>
                        </div>
                    </div>
                ))}
                <button type="button" className="add-scene-button" onClick={addNewScene}>
                    Aggiungi Scena
                </button>
                <button type="submit" className="create-button">
                    Salva la tua storia
                </button>
            </form>
        </div>
    );
};

export default Scene;
