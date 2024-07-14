const router = require('express').Router();
const Riddle = require('../models/riddle.model');

// Aggiungi un nuovo indovinello
router.route('/add').post(async (req, res) => {
    const { sceneId, riddle_text, answer, correct_scene, incorrect_scene } = req.body;

    try {
        // Controlla se l'indovinello esiste già
        const existingRiddle = await Riddle.findOne({ sceneId });
        if (existingRiddle) {
            return res.status(400).json('Riddle already exists');
        }

        // Crea un nuovo indovinello
        const newRiddle = new Riddle({ sceneId, riddle_text, answer, correct_scene, incorrect_scene });
        await newRiddle.save();
        res.json('Riddle added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutte le indovinelli
router.route('/').get(async (req, res) => {
    try {
        const riddles = await Riddle.find();
        res.json(riddles);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni un indovinello dato lo sceneId
router.route('/sceneId/:sceneId').get(async (req, res) => {
    const { sceneId } = req.params;

    try {
        const riddle = await Riddle.findOne({ sceneId });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json(riddle);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni il riddle_text dato lo sceneId
router.route('/sceneId/:sceneId/riddle_text').get(async (req, res) => {
    const { sceneId } = req.params;

    try {
        const riddle = await Riddle.findOne({ sceneId });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ riddle_text: riddle.riddle_text });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni la risposta giusta dato lo sceneId
router.route('/sceneId/:sceneId/answer').get(async (req, res) => {
    const { sceneId } = req.params;

    try {
        const riddle = await Riddle.findOne({ sceneId });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ answer: riddle.answer });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni la scena corretta dato lo sceneId
router.route('/sceneId/:sceneId/correct_scene').get(async (req, res) => {
    const { sceneId } = req.params;

    try {
        const riddle = await Riddle.findOne({ sceneId });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ correct_scene: riddle.correct_scene });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni la scena sbagliata dato lo sceneId
router.route('/sceneId/:sceneId/incorrect_scene').get(async (req, res) => {
    const { sceneId } = req.params;

    try {
        const riddle = await Riddle.findOne({ sceneId });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ incorrect_scene: riddle.incorrect_scene });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina un indovinello dato lo sceneId
router.route('/delete/:sceneId').delete(async (req, res) => {
    const { sceneId } = req.params;

    try {
        const deletedRiddle = await Riddle.findOneAndDelete({ sceneId });
        if (!deletedRiddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json('Riddle deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
