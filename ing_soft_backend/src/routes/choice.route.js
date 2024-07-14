const router = require('express').Router();
const Choice = require('../models/choice.model'); // Assicurati che il modello Choice sia correttamente importato

// Aggiungi una nuova scelta
router.route('/add').post(async (req, res) => {
    const { sceneId, choices } = req.body;

    try {
        // Crea una nuova scelta
        const newChoice = new Choice({ sceneId, choices });
        await newChoice.save();
        res.json('Choice added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutte le scelte
router.route('/').get(async (req, res) => {
    try {
        const choices = await Choice.find();
        res.json(choices);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni le choices dato lo sceneId
router.route('/sceneId/:sceneId').get(async (req, res) => {
    const { sceneId } = req.params;

    try {
        const choices = await Choice.find({ sceneId });
        if (!choices || choices.length === 0) {
            return res.status(404).json('Choices not found');
        }
        res.json(choices[0].choices); // Assuming you want the choices array from the first matching document
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina tutte le scelte
router.route('/delete/all').delete(async (req, res) => {
    try {
        await Choice.deleteMany();
        res.json('All choices deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina una scelta dato il suo ID
router.route('/delete/:id').delete(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedChoice = await Choice.findByIdAndDelete(id);
        if (!deletedChoice) {
            return res.status(404).json('Choice not found');
        }
        res.json('Choice deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
