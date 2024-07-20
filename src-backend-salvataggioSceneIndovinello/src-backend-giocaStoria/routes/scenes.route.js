// routes/scenes.js

const router = require('express').Router();
const Scene = require('../models/scene.model');

// Aggiungi una nuova scena
router.route('/add').post(async (req, res) => {
    const { authorName, storyTitle, title, description, sceneType, requiredObject, foundObject } = req.body;
    try {
        const newScene = new Scene({
            authorName,
            storyTitle,
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

router.route('/story/:storyTitle/author/:authorName').get(async (req, res) => {
    const { storyTitle, authorName } = req.params;

    try {
        const scenes = await Scene.find({ storyTitle, authorName });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.route('/edit/:authorName/:storyTitle/:sceneTitle').put(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;
    const { description } = req.body;

    try {
        const scene = await Scene.findOneAndUpdate(
            { authorName: authorName, storyTitle: storyTitle, title: sceneTitle },
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
// Ottieni tutte le scene
router.route('/').get(async (req, res) => {
    try {
        const scenes = await Scene.find();
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutte le scene di un autore col titolo della storia
router.route('/author/:authorName/storyTitle/:storyTitle').get(async (req, res) => {
    const { authorName, storyTitle } = req.params;

    try {
        const scenes = await Scene.find({ authorName, storyTitle });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Verifica se una scena esiste già basata sul titolo della storia, il titolo della scena e il nome dell'autore
router.route('/check').get(async (req, res) => {
    const { storyTitle, title, authorName } = req.query;

    try {
        const scene = await Scene.findOne({ storyTitle, title, authorName });

        if (scene) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Verifica se l'autore ha creato almeno una scena finale 
    router.route('/check/story/:storyTitle/author/:authorName/finale').get(async (req, res) => {
    const { storyTitle, authorName } = req.params; // Recupera i parametri di percorso

    try {
        const scene = await Scene.find({ storyTitle, authorName, sceneType: 'finale' });

        if (scene && scene.length > 0) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
// restituisce il tipo della scena
router.route('/sceneType').post(async (req, res) => {
    const { storyTitle, authorName, title } = req.body;

    try {
        const scene = await Scene.findOne({ storyTitle, authorName, title });

        if (scene) {
            return res.status(200).json(scene.sceneType);
        } else {
            return res.status(404).json('Scene not found');
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
// Nuova rotta per ottenere le scene di tipo "indovinello" per una determinata storia e autore
router.route('/story/:storyTitle/author/:authorName/indovinello').get(async (req, res) => {
    const { storyTitle, authorName } = req.params;

    try {
        const scenes = await Scene.find({ storyTitle, authorName, sceneType: 'indovinello' });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Nuova rotta per ottenere le scene di tipo "scelta" per una determinata storia e autore
router.route('/story/:storyTitle/author/:authorName/scelta').get(async (req, res) => {
    const { storyTitle, authorName } = req.params;

    try {
        const scenes = await Scene.find({ storyTitle, authorName, sceneType: 'scelta' });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
// Nuova rotta per ottenere le scene di tipo "finale" per una determinata storia e autore
router.route('/story/:storyTitle/author/:authorName/finale').get(async (req, res) => {
    const { storyTitle, authorName } = req.params;

    try {
        const scenes = await Scene.find({ storyTitle, authorName, sceneType: 'finale' });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});


});

// restituisce la descrizione
router.route('/sceneDescription').post(async (req, res) => {
    const { storyTitle, authorName, title } = req.body;

    try {
        const scene = await Scene.findOne({ storyTitle, authorName, title });

        if (scene) {
            return res.status(200).json(scene.description);
        } else {
            return res.status(404).json('Scene not found');
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

//necessità di un oggetto (chiamata a scenes.route.js)
router.route('/itemNeeded').post(async (req, res) => {
    const { storyTitle, authorName, title } = req.body;

    try {
        const scene = await Scene.findOne({ storyTitle, authorName, title });

        if (scene) {
            return res.status(200).json({ requiredObject: scene.requiredObject });
        } else {
            return res.status(404).json('Scene not found');
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

//check oggetto trovato (chiamata a scenes.route.js)
router.route('/itemFound').post(async (req, res) => {
    const { storyTitle, authorName, title } = req.body;

    try {
        const scene = await Scene.findOne({ storyTitle, authorName, title });

        if (scene) {
            return res.status(200).json( scene.foundObject );
        } else {
            return res.status(404).json('Scene not found');
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});
module.exports = router;
