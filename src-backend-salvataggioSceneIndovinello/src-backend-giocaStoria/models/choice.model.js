const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choiceSchema = new Schema({
    authorName: { type: String, required: true },
    storyTitle: { type: String, required: true },
    sceneTitle: { type: String, required: true },
    choices: [{
            sceneTitle:{ type: String, required: true }
        }]
});

const Choice = mongoose.model('Choice', choiceSchema);

module.exports = Choice;