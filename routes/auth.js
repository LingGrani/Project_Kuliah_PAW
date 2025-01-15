// List of All packages
const express = require('express');
const router = express.Router();
const db = require('../database/db');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// Static folder public for assets & css
router.use(express.static('public'));

// Session for auth user
router.use(session({
    secret: 'pawgasal',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Login view route
router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'layouts/auth',
        title: "Login"
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error mengambil data user');
        }

        if (results.length === 0) {
            return res.status(404).send('User tidak ditemukan.');
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error saat check password');
            }

            if (!isMatch) {
                return res.status(401).send("password salah.");
            }

            req.session.userId = user.id;

            res.redirect('/');
        });
    });
});

module.exports = router;