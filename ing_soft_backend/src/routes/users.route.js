const router = require('express').Router();
const User = require('../models/user.model.js'); // Assicurati che il modello User sia correttamente importato
const crypto = require('crypto');


// Aggiungi un nuovo utente
router.route('/add').post(async (req, res) => {
    const { username, password } = req.body;

    try {
        // Controlla se l'utente esiste già
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json('User already exists');
        }
        const newUser = new User({username, password });
        await newUser.save();
        res.json('User added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutti gli utenti
router.route('/').get(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Trova l'utente con il nome utente fornito
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Confronta la password fornita con quella memorizzata
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Login riuscito
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Elimina tutti gli utenti
router.route('/delete/all').delete(async (req, res) => {
    try {
        await User.deleteMany();
        res.json('All users deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
