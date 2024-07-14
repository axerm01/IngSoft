const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const User = require('./models/user.model'); // Assumiamo che il modello User sia definito in models/User.js

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Assicurati di cambiare con l'URL del tuo frontend
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Connessione a MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Endpoint di registrazione
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = crypto.createHash('sha256').update(username).digest('hex');
        const newUser = new User({ userId, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Endpoint di login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Attempting login for user: ${username}`);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Imposta un cookie con l'ID dell'utente
        res.cookie('userId', user.userId, {
            httpOnly: false,
            secure: false, // Imposta true in produzione
            sameSite: 'Lax',
            path: '/'
        });

        console.log('Login successful');
        res.json({ message: 'Login successful' });
        //res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});



// Middleware di autenticazione
/*const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};*/

// Route di esempio
app.get('/', /*authenticateToken,*/ (req, res) => {
    res.json({ message: 'Server attivo', user: req.user });
});
const itemsRouter = require('./routes/items.route.js');
const usersRouter = require('./routes/users.route.js');
const scenesRouter = require('./routes/scenes.route.js'); // Percorso relativo corretto
const storiesRouter = require('./routes/stories.route.js');
const choiceRouter = require('./routes/choice.route.js');
const riddleRouter = require('./routes/riddle.route.js');
        
app.use('/riddles', riddleRouter);
app.use('/choices', choiceRouter);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/scenes', scenesRouter); // Aggiungi questa linea per le rotte delle scene
app.use('/stories', storiesRouter);

// Avvio del server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


