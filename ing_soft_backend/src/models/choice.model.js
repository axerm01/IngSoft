const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choiceSchema = new Schema({
    sceneId: { type: String, required: true },
    choices:  [{
        sceneId: {type: String, required: true}
    }]
});

const Choice = mongoose.model('Choice', choiceSchema);

module.exports = Choice;