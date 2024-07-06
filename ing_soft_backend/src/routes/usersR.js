const router = require('express').Router();
const User = require('../models/userM'); // Assicurati che il modello User sia correttamente importato

// Aggiungi un nuovo utente
router.route('/add').post(async (req, res) => {
    const { username, password } = req.body;
    console.log('Tentativo di registrazione:', username, password);
  
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Utente esistente:', username);
            return res.status(400).json('User already exists');
        }
  
        const newUser = new User({ username, password });
        await newUser.save();
        console.log('Nuovo utente aggiunto:', newUser);
        res.json('User added!');
    } catch (error) {
        console.log('Errore durante la registrazione:', error);
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

// Ottieni un utente dato il suo username
router.route('/:username').get(async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
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

// Elimina un utente dato il suo username
router.route('/delete/:username').delete(async (req, res) => {
    const { username } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ username });
        if (!deletedUser) {
            return res.status(404).json('User not found');
        }
        res.json('User deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;