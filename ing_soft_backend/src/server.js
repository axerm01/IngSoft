const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB connection established`);
});

/*const exercisesRouter = require('./routes/exercises');
app.use('/exercises', exercisesRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
*/

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});