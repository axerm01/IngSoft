const router = require('express').Router();
const Riddle = require('../models/riddle.model');

// Aggiungi un nuovo indovinello
router.route('/add').post(async (req, res) => {
    const { authorName, storyTitle, sceneTitle, riddle_text, answer, correct_scene, incorrect_scene } = req.body;

    try {
        // Controlla se l'indovinello esiste già
        const existingRiddle = await Riddle.findOne({ authorName, storyTitle, sceneTitle });
        if (existingRiddle) {
            return res.status(400).json('Riddle already exists');
        }

        // Crea un nuovo indovinello
        const newRiddle = new Riddle({ authorName, storyTitle, sceneTitle, riddle_text, answer, correct_scene, incorrect_scene });
        await newRiddle.save();
        res.json('Riddle added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutti gli indovinelli
router.route('/').get(async (req, res) => {
    try {
        const riddles = await Riddle.find();
        res.json(riddles);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni un indovinello dato authorName, storyTitle e sceneTitle
router.route('/:authorName/:storyTitle/:sceneTitle').get(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;

    try {
        const riddle = await Riddle.findOne({ authorName, storyTitle, sceneTitle });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json(riddle);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni il riddle_text dato authorName, storyTitle e sceneTitle
router.route('/:authorName/:storyTitle/:sceneTitle/riddle_text').get(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;

    try {
        const riddle = await Riddle.findOne({ authorName, storyTitle, sceneTitle });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ riddle_text: riddle.riddle_text });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni la risposta giusta dato authorName, storyTitle e sceneTitle
router.route('/:authorName/:storyTitle/:sceneTitle/answer').get(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;

    try {
        const riddle = await Riddle.findOne({ authorName, storyTitle, sceneTitle });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ answer: riddle.answer });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni la scena corretta dato authorName, storyTitle e sceneTitle
router.route('/:authorName/:storyTitle/:sceneTitle/correct_scene').get(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;

    try {
        const riddle = await Riddle.findOne({ authorName, storyTitle, sceneTitle });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ correct_scene: riddle.correct_scene });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni la scena sbagliata dato authorName, storyTitle e sceneTitle
router.route('/:authorName/:storyTitle/:sceneTitle/incorrect_scene').get(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;

    try {
        const riddle = await Riddle.findOne({ authorName, storyTitle, sceneTitle });
        if (!riddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json({ incorrect_scene: riddle.incorrect_scene });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina un indovinello dato authorName, storyTitle e sceneTitle
router.route('/delete/:authorName/:storyTitle/:sceneTitle').delete(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;

    try {
        const deletedRiddle = await Riddle.findOneAndDelete({ authorName, storyTitle, sceneTitle });
        if (!deletedRiddle) {
            return res.status(404).json('Riddle not found');
        }
        res.json('Riddle deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
