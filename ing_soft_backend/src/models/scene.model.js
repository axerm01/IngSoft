const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sceneSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    sceneType: { 
        type: String, 
        required: true,
        enum: ['scelta', 'indovinello', 'finale']
    }
});

const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;
