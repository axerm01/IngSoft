const router = require('express').Router();
const Story = require('../models/story.model'); // Assicurati che il modello User sia correttamente importato

// Aggiungi una nuova storia
router.route('/add').post(async (req, res) => {
    const { storyId, title, authorId, creationDate } = req.body;

    try {
        // Crea una nuova storia
        const newStory = new Story({storyId, title, authorId, creationDate});
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
    const { storyId } = req.params;

    try {
        const story = await Story.findOne({ storyId });
        if (!story) {
            return res.status(404).json('Story not found');
        }
        res.json(story);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
// Aggiorna la descrizione di una scena dato il suo titolo
/*router.route('/update/:title').put(async (req, res) => {
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
});*/


// Elimina tutte le storie
router.route('/delete/all').delete(async (req, res) => {
    try {
        await Story.deleteMany();
        res.json('All scenes deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina una storia dato l'id
router.route('/delete/:id').delete(async (req, res) => {
    const { storyId } = req.params;

    try {
        const deletedStory = await Story.findOneAndDelete({ storyId });
        if (!Story) {
            return res.status(404).json('Story not found');
        }
        res.json('Story deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
