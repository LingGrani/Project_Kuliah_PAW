require('dotenv')
const express = require('express')
const router = express.Router();
const db = require('../database/db');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// session
router.use(
    session({
        secret: 'hello123',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set secure: true if using HTTPS
    })
);

// Route Signup 
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // Insert user into the database
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hash],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error registering user');
                }

                // Save user ID in session
                req.session.userId = result.insertId;

                res.status(201).redirect('/');
            }
        );
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Query to find user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching user');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0];

        // Compare provided password with hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error checking password');
            }

            if (!isMatch) {
                return res.status(401).send('Incorrect password');
            }

            // Save user ID in session
            req.session.userId = user.id;

            res.redirect('/'); // Redirect to homepage after successful login
        });
    });
});

module.exports = router;