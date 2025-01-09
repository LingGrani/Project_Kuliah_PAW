const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const router = express.Router();

// In-memory "database"
const users = [];

// Middleware for sessions
router.use(
    session({
        secret: 'hai123',
        resave: false,
        saveUninitialized: true,
    })
);

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Simulate saving user in local storage
    users.push({ id: users.length + 1, username, email, password: hashedPassword });

    // Save user ID in session
    req.session.userId = users.length;

    res.status(201).send('Signup successful and session created');
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Simulate finding user in local storage
    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send('Incorrect password');
    }

    // Save user ID in session
    req.session.userId = user.id;

    res.status(200).send('Login successful');
});

module.exports = router;
