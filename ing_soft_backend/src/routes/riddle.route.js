const express = require('express');
const router = express.Router();
const Riddle = require('../models/riddle.model');

// Aggiungi nuovi indovinelli con scene
router.post('/add-scenes', async (req, res) => {
  const { scenes } = req.body;

  try {
    // Controlla se l'array di scene è presente e se è un array
    if (!scenes || !Array.isArray(scenes)) {
      return res.status(400).json({ error: 'Invalid scenes format: scenes should be an array' });
    }

    // Crea nuovi indovinelli per ogni scena
    const newRiddles = scenes.map(scene => ({
      authorName: scene.authorName,
      storyTitle: scene.storyTitle,
      sceneTitle: scene.sceneTitle,
      riddle_text: scene.riddle_text,
      answer: scene.answer,
      correct_scene: scene.correct_scene,
      incorrect_scene: scene.incorrect_scene
    }));

    // Salva i nuovi indovinelli nel database
    await Riddle.insertMany(newRiddles);
    
    res.json({ message: 'Riddles with scenes added successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error adding riddles with scenes: ' + error.message });
  }
});

//richiamare l'indovinello (chiamata a riddle.route.js)
router.route('/getRiddle').post(async (req, res) => {
  const { storyTitle, authorName, sceneTitle} = req.body;

  try {
      const riddle = await Riddle.findOne({ storyTitle, authorName, sceneTitle });
      if (!riddle) {
          return res.status(404).json('Riddle not found');
      }
      return res.status(200).json({ riddle_text: riddle.riddle_text, answer: riddle.answer });
  } catch (error) {
      res.status(400).json('Error: ' + error);
  }
});

//in base alla risposta data restituisce una scena
router.route('/checkAnswer').post(async (req, res) => {
  const { storyTitle, authorName, sceneTitle, answer } = req.body;

  try {
      const riddle = await Riddle.findOne({storyTitle, authorName, sceneTitle});

      if (!riddle) {
          return res.status(404).json('Riddle not found');
      }

      const isCorrect = riddle.answer === answer;

      if (isCorrect) {
          return res.status(200).json({ nextScene: riddle.correct_scene });
      } else {
          return res.status(200).json({ nextScene: riddle.incorrect_scene });
      }
  } catch (error) {
      res.status(400).json('Error: ' + error);
  }
});


module.exports = router;
