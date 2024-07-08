const router = require('express').Router();
const Scene = require('../models/scene.model'); // Assicurati che il modello User sia correttamente importato

// Aggiungi una nuova scena
router.route('/add').post(async (req, res) => {
    const { title, description, sceneType } = req.body;

    try {
        // Controlla se la scena esiste già
        const existingScene = await Scene.findOne({ title });
        if (existingScene) {
            return res.status(400).json('Scene already exists');
        }

        // Crea una nuova scena
        const newScene = new Scene({ title, description, sceneType });
        await newScene.save();
        res.json('Scene added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutte le scene
router.route('/').get(async (req, res) => {
    try {
        const scenes = await Scene.find();
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni una scena dato il suo titolo
router.route('/:title').get(async (req, res) => {
    const { title } = req.params;

    try {
        const scene = await Scene.findOne({ title });
        if (!scene) {
            return res.status(404).json('Scena not found');
        }
        res.json(scene);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
// Aggiorna la descrizione di una scena dato il suo titolo
router.route('/update/:title').put(async (req, res) => {
    const { title } = req.params;
    const { description } = req.body;

    try {
        const scene = await Scene.findOne({ title });
        if (!scene) {
            return res.status(404).json('Scene not found');
        }

        scene.description = description;
        await scene.save();

        res.json('Scene description updated');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});


// Elimina tutte le scene
router.route('/delete/all').delete(async (req, res) => {
    try {
        await Scene.deleteMany();
        res.json('All scenes deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina una scena dato il titolo
router.route('/delete/:title').delete(async (req, res) => {
    const { title } = req.params;

    try {
        const deletedScene = await Scene.findOneAndDelete({ title });
        if (!deletedScene) {
            return res.status(404).json('Scene not found');
        }
        res.json('Scene deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
