// src/components/UserItems.js

import React, { useState, useEffect } from 'react';
import '../style/Items.css';

const UserItems = () => {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const userId = 'tonno'; // ID dell'utente, puoi cambiarlo dinamicamente se necessario

    useEffect(() => {
        // Recupera gli oggetti dell'utente all'avvio del componente
        fetch(`http://localhost:5001/items/user/${userId}`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleAddItem = () => {
        // Aggiungi un nuovo oggetto
        fetch('http://localhost:5001/items/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, name: newItemName }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Item added successfully!');
                setItems([...items, { userId, name: newItemName }]);
                setNewItemName('');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding item');
            });
    };

    return (
        <div className="user-items-container">
            <h1>User Items</h1>
            <ul className="items-list">
                {items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
            <div className="add-item-form">
                <input
                    type="text"
                    placeholder="Inserisci un nuovo oggetto"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                />
                <button onClick={handleAddItem}>Aggiungi oggetto</button>
            </div>
        </div>
    );
};

export default UserItems;
