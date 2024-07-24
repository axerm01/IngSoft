const router = require('express').Router();
let Game = require('../models/game.model');

// Crea una nuova partita
router.route('/add').post(async (req, res) => {
    const { storyTitle, author, initialSceneTitle, playerName, objects } = req.body;

    const newGame = new Game({
        storyTitle,
        author,
        initialSceneTitle,
        playerName,
        objects: objects || []
    });

    try {
        await newGame.save();
        res.status(201).json('New game created!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});


//controlla che esista un game dati storyTitle, author, playerName
router.route('/exists').post(async (req, res) => {
    const { storyTitle, author, playerName } = req.body;

    try {
        const game = await Game.findOne({ storyTitle, author, playerName });

        if (game) {
            return res.status(200).json('Game exists');
        } else {
            return res.status(404).json('Game not found');
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
//carica i dati della partita
router.route('/getGame').post(async (req, res) => {
    const { storyTitle, author, playerName } = req.body;

    try {
        const game = await Game.findOne({ storyTitle, author, playerName });
        if (!game) {
            return res.status(404).json('Game not found');
        }
        res.json(game);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.route('/getScene').post(async (req, res) => {
    const { storyTitle, author, playerName } = req.body;

    try {
        const game = await Game.findOne({ storyTitle, author, playerName });
        if (!game) {
            return res.status(404).json('Game not found');
        }
        res.json(game.initialSceneTitle);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Aggiorna la scena di una partita esistente
router.route('/updateScene').put(async (req, res) => {
    const { storyTitle, author, playerName, newSceneTitle } = req.body;

    try {
        const game = await Game.findOneAndUpdate(
            { storyTitle, author, playerName},
            { initialSceneTitle: newSceneTitle },
            { new: true }
        );

        if (!game) {
            return res.status(404).json('Game not found');
        }
        res.json('Scene updated successfully!');
        console.log(newSceneTitle);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
//controlla se esiste un oggetto
router.route('/itemExists').post(async (req, res) => {
    const { storyTitle, author, playerName, item } = req.body;

    try {
        const game = await Game.findOne({ storyTitle, author, playerName, objects: item });

        if (game) {
            return res.status(200).json('Item exists in game');
        } else {
            return res.status(404).json('Item not found in game');
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Aggiorna gli aggetti di una partita esistente
router.route('/addItem').put(async (req, res) => {
    const { storyTitle, author, playerName, newItem } = req.body;

    try {
        const game = await Game.findOneAndUpdate(
            { storyTitle, author, playerName},
            { $push: { objects: newItem } },
            { new: true }
        );

        if (!game) {
            return res.status(404).json('Game not found');
        }

        res.json('Item added successfully!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
//get Item
router.route('/removeItem').put(async (req, res) => {
    const { storyTitle, author, playerName, newItem } = req.body;

    try {
        const game = await Game.findOneAndUpdate(
            { storyTitle, author, playerName},
            { $pull: { objects: newItem } },
            { new: true }
        );

        if (!game) {
            return res.status(404).json('Game not found');
        }

        res.json('Item removed successfully!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});            

//dati in input Utente, nome storia, giocatore cerca in games e cancella l'elemento
router.route('/removeGame').delete(async (req, res) => {
    const { storyTitle, author, playerName} = req.body;

    try {
        const game = await Game.findOneAndDelete(
            { storyTitle, author, playerName}
        );

        if (!game) {
            return res.status(404).json('Salvataggio non trovato');
        }

        res.json('Gioco rimosso con successo!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});            
module.exports = router;
