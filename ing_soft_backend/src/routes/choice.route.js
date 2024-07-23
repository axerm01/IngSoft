const router = require('express').Router();
const Choice = require('../models/choice.model');

// Aggiungi nuove choice scenes
router.post('/add-scenes', async (req, res) => {
    const { scenes } = req.body;

    try {
        // Controlla se l'array di scene è presente e se è un array
        if (!scenes || !Array.isArray(scenes)) {
            return res.status(400).json({ error: 'Invalid scenes format: scenes should be an array' });
        }

        // Crea nuove choice scenes per ogni scena
        const newChoices = scenes.map(scene => ({
            authorName: scene.authorName,
            storyTitle: scene.storyTitle,
            sceneTitle: scene.sceneTitle,
            choices: scene.choices.map(choice => ({
                sceneTitle: choice.sceneTitle
            }))
        }));

        // Salva le nuove choice scenes nel database
        await Choice.insertMany(newChoices);

        res.json({ message: 'Choice scenes added successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error adding choice scenes: ' + error.message });
    }
});

// Metodo per ottenere le scelte basate sul titolo della storia, la scena e l'utente
router.post('/getChoices', async (req, res) => {
    const { storyTitle, sceneTitle, authorName} = req.body;

    try {
        const choice = await Choice.findOne({ storyTitle, sceneTitle, authorName });

        if (!choice) {
            return res.status(404).json({ error: 'Choices not found for the given story and scene' });
        }

        res.json(choice.choices);
    } catch (error) {
        res.status(400).json({ error: 'Error retrieving choices: ' + error.message });
    }
});



module.exports = router;
