const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: { type: String, required: true },
    authorId: { type: String, ref: 'User', required: true },
    initialSceneTitle: {type: String},
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;