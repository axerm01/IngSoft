const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sceneSchema = new Schema({
    //sceneId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    storyId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    sceneType: {
        type: String,
        required: true,
        enum: ['scelta', 'indovinello', 'finale']
    },
    requiredObject: { type: String },
    foundObject: { type: String }
});

const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;
