const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sceneSchema = new Schema({
    sceneId: { type: String, required: true },
    storyId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    sceneType: {
        type: String,
        required: true,
        enum: ['scelta', 'indovinello', 'finale']
    },
    requiredItemId: { type: String },
    pickItemId:  { type: String }
});

const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;
