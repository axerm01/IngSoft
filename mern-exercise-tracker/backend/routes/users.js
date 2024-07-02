const router = require('express').Router();
let User = require('../models/user.model');

// Rotta GET per ottenere tutti gli utenti
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(400).json('Error: ' + error));
});

// Rotta POST per aggiungere un nuovo utente
router.route('/add').post((req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(error => res.status(400).json('Error: ' + error));
});

// Rotta GET per ottenere un utente dato il suo username
router.route('/:username').get((req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json('User not found');
            }
        })
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = User;

module.exports = router;
