// routes/scenes.js
const router = require('express').Router();
const Scene = require('../models/scene.model');

// Aggiungi una nuova scena
router.route('/add').post(async (req, res) => {
    const { storyId, title, description, sceneType, requiredObject, foundObject } = req.body;
    try {
        const newScene = new Scene({
            storyId,
            title,
            description,
            sceneType,
            requiredObject,
            foundObject,
        });

        await newScene.save();
        res.json('Scene added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutte le scene basate sul titolo della storia
router.route('/story/:storyTitle').get(async (req, res) => {
    const { storyTitle } = req.params;

    try {
        const scenes = await Scene.find({ storyId: storyTitle });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Modifica la descrizione di una scena basata sul titolo della storia e della scena
router.route('/edit/:storyTitle/:sceneTitle').put(async (req, res) => {
    const { storyTitle, sceneTitle } = req.params;
    const { description } = req.body;

    try {
        const scene = await Scene.findOneAndUpdate(
            { storyId: storyTitle, title: sceneTitle },
            { description: description },
            { new: true }
        );

        if (!scene) {
            return res.status(404).json('Scene not found');
        }

        res.json('Scene description updated');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Verifica se una scena esiste già basata sul titolo della storia e della scena
router.route('/check').get(async (req, res) => {
    const { storyId, title } = req.query;

    try {
        const scene = await Scene.findOne({ storyId, title });

        if (scene) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
