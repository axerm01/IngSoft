const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riddleSchema = new Schema({
    authorName: { type: String, required: true },
    storyTitle: { type: String, required: true },
    sceneTitle: { type: String, required: true },
    riddle_text: { type: String, required: true },
    answer: { type: String, required: true },
    correct_scene: { type: String, required: true },
    incorrect_scene: { type: String, required: true }
});

const Riddle = mongoose.model('Riddle', riddleSchema);

module.exports = Riddle;