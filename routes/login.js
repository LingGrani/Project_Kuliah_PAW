require('dotenv')
const express = require('express')
const router = express.Router();
const db = require('../database/db');


// Route Signup
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error hashing password');

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
            if (err) return res.status(500).send('Error registering user');
            res.redirect('/login');
        });
    });
});

// Route Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Error fetching user');
        if (results.length === 0) return res.status(400).send('User not found');

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) return res.status(500).send('Error checking password');
            if (!isMatch) return res.status(401).send('Incorrect password');

            // Simpan userId dalam sesi setelah login berhasil
            req.session.userId = results[0].id;
            res.redirect('/'); // Arahkan ke halaman utama setelah login
        });
    });
});


module.exports = router;