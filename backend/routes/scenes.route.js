const router = require('express').Router();
const Scene = require('../models/scene.model');

// Add a new scene
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

// Get all scenes
router.route('/').get(async (req, res) => {
    try {
        const scenes = await Scene.find();
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Get scenes by story and author
router.route('/story/:storyTitle/author/:authorName').get(async (req, res) => {
    const { storyTitle, authorName } = req.params;

    try {
        const scenes = await Scene.find({ storyTitle, authorName });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Get scenes by type, story, and author
router.route('/story/:storyTitle/author/:authorName/:sceneType').get(async (req, res) => {
    const { storyTitle, authorName, sceneType } = req.params;

    try {
        const scenes = await Scene.find({ storyTitle, authorName, sceneType });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Check if a scene exists based on story title, scene title, and author name
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

// Check if the author has created at least one "finale" scene
router.route('/check/story/:storyTitle/author/:authorName/finale').get(async (req, res) => {
    const { storyTitle, authorName } = req.params;

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

// Update scene description
router.route('/edit/:authorName/:storyTitle/:sceneTitle').put(async (req, res) => {
    const { authorName, storyTitle, sceneTitle } = req.params;
    const { description } = req.body;

    try {
        const scene = await Scene.findOneAndUpdate(
            { authorName, storyTitle, title: sceneTitle },
            { description },
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
// Get scenes of type "indovinello" for a given story and author
router.route('/story/:storyTitle/author/:authorName/indovinello').get(async (req, res) => {
    const { storyTitle, authorName } = req.params;

    try {
        const scenes = await Scene.find({ storyTitle, authorName, sceneType: 'indovinello' });
        res.json(scenes);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Get scene type
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
});

// Get scene description
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

// Get required object for a scene
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

// Check found object for a scene
router.route('/itemFound').post(async (req, res) => {
    const { storyTitle, authorName, title } = req.body;

    try {
        const scene = await Scene.findOne({ storyTitle, authorName, title });

        if (scene) {
            return res.status(200).json(scene.foundObject);
        } else {
            return res.status(404).json('Scene not found');
        }
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
