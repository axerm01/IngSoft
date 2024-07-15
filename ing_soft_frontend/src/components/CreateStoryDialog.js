import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateStoryDialog = ({ isOpen, onClose, onStoryCreated }) => {
    const [title, setTitle] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        //const authorId = Cookies.get('userId');
        const authorId = "123abc";
        const creationDate = new Date().toISOString();

        try {
            await axios.post(apiUrl+'/stories/add', { title, authorId, creationDate }, {withCredentials: true});
            onStoryCreated(); // Callback per aggiornare l'elenco delle storie
            onClose(); // Chiudi il dialogo
        } catch (error) {
            console.error('There was an error creating the story!', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.dialog}>
                <h2>Create a New Story</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.actions}>
                        <button type="button" onClick={onClose} style={styles.button}>
                            Cancel
                        </button>
                        <button type="submit" style={styles.button}>
                            Vai
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '4px',
        width: '300px',
    },
    field: {
        marginBottom: '10px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: '10px',
    },
};

export default CreateStoryDialog;
