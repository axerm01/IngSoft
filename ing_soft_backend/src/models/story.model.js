const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    storyId: { type: String },
    title: { type: String, required: true },
    authorId: { type: String, ref: 'User', required: true },
    creationDate: { type: Date, default: Date.now() },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;