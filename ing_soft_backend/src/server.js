const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.DATABASE_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Route di esempio
app.get('/', (req, res) => {
    res.send('SERVER ATTIVO');
});

const usersRouter = require('./routes/users.route.js');
const scenesRouter = require('./routes/scenes.route.js'); // Percorso relativo corretto

app.use('/users', usersRouter);
app.use('/scenes', scenesRouter); // Aggiungi questa linea per le rotte delle scene

// Avvio del server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
