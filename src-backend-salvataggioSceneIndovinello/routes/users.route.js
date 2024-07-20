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

        // Crea un nuovo utente
        const userId = crypto.createHash('sha256').update(username).digest('hex');
        const newUser = new User({ _id: userId, username, password });
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

// Ottieni un utente dato il suo id
router.route('/:id').get(async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(400).json('Error: ' + error);
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

// Elimina un utente dato il suo id
router.route('/delete/:id').delete(async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ userId });
        if (!deletedUser) {
            return res.status(404).json('User not found');
        }
        res.json('User deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
