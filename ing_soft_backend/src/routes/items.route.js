const router = require('express').Router();
const Item = require('../models/item.model');

// Aggiungi un nuovo item
router.route('/add').post(async (req, res) => {
    const { userId, name } = req.body;

    try {
        // Controlla se l'item esiste già
        const existingItem = await Item.findOne({userId, name });
        if (existingItem) {
            return res.status(400).json('Item already exists');
        }

        // Crea un nuovo item
        const newItem = new Item({ userId, name });
        await newItem.save();
        res.json('Item added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutti gli item
router.route('/').get(async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni tutti gli item di un utente
router.route('/user/:userId').get(async (req, res) => {
    const { userId } = req.params;

    try {
        const items = await Item.find({ userId });
        res.json(items);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Ottieni un item dato il suo nome
router.route('/:name').get(async (req, res) => {
    const { name } = req.params;

    try {
        const item = await Item.findOne({ name });
        if (!item) {
            return res.status(404).json('Item not found');
        }
        res.json(item);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina tutti gli item
router.route('/delete/all').delete(async (req, res) => {
    try {
        await Item.deleteMany();
        res.json('All items deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

// Elimina un item dato il nome
router.route('/delete/:name').delete(async (req, res) => {
    const { name } = req.params;

    try {
        const deletedItem = await Item.findOneAndDelete({ name });
        if (!deletedItem) {
            return res.status(404).json('Item not found');
        }
        res.json('Item deleted');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;
