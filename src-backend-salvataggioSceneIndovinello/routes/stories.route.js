const router = require('express').Router();
const Story = require('../models/story.model'); // Assicurati che il modello Story sia correttamente importato

// Aggiungi una nuova storia
router.route('/add').post(async (req, res) => {
    const { title, initialSceneTitle, authorId } = req.body;

    try {
        // Verifica se esiste già una storia con lo stesso titolo
        const existingStory = await Story.findOne({ title });
        if (existingStory) {
            return res.status(400).json('Story with this title already exists');
        }

        // Crea una nuova storia
        const newStory = new Story({ title, initialSceneTitle, authorId });
        await newStory.save();
        res.json('Story added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutte le storie
router.route('/').get(async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni una storia dato il suo id
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;

    try {
        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json('Story not found');
        }
        res.json(story);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Controlla se esiste già una storia dato il titolo e l'id dell'autore
router.route('/exists/:authorId/:title').get(async (req, res) => {
    const { authorId, title } = req.params;

    try {
        const existingStory = await Story.findOne({ authorId, title });
        if (existingStory) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina tutte le storie
router.route('/delete/all').delete(async (req, res) => {
    try {
        await Story.deleteMany();
        res.json('All stories deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina una storia dato l'id
router.route('/delete/:id').delete(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStory = await Story.findByIdAndDelete(id);
        if (!deletedStory) {
            return res.status(404).json('Story not found');
        }
        res.json('Story deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Aggiorna la initialSceneTitle di una storia dato il nome della storia e l'autore
router.route('/updateInitialScene').put(async (req, res) => {
    const { storyTitle, authorId, newInitialSceneTitle } = req.body;

    try {
        const story = await Story.findOneAndUpdate(
            { title: storyTitle, authorId: authorId },
            { initialSceneTitle: newInitialSceneTitle },
            { new: true }
        );

        if (!story) {
            return res.status(404).json('Story not found');
        }

        res.json('Initial scene title updated');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
