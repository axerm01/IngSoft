const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    storyTitle: { type: String, required: true },
    author: { type: String, required: true },
    initialSceneTitle: { type: String, required: true },
    playerName: { type: String, required: true },
    objects: [{ type: String}]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
