require('dotenv').config();
const express = require('express');
const expressLayout = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 3000;

// Layout
app.use(expressLayout);
app.use(express.json());
app.set('view engine', 'ejs');
app.set("layout", "./layouts/main");
app.use(express.urlencoded({ extended: true }));

// Access Static folder
app.use(express.static("public"));

// Route Home
app.get('/', (req, res) => {
    res.render('index', {
        title: "HomePage"
    });
});

// Route Login
app.get('/login', (req, res) => {
    res.render('login', {
        title: "Login"
    });
});

// Route Movies
app.get('/movies', (req, res) => {
    res.render('movies', {
        title: "Movie"
    });
});

// Route Register
app.get('/register', (req, res) => {
    res.render('register', {
        title: "Register"
    });
});

// Route Series
app.get('/series', (req, res) => {
    res.render('series', {
        title: "Series"
    });
});

// Starting app
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})