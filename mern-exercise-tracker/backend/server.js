const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Prova", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Route di esempio
app.get('/', (req, res) => {
    res.send('NABROOO?? World');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Avvio del server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
