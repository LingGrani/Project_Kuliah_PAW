require('dotenv').config();
const express = require('express');
const expressLayout = require("express-ejs-layouts");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Layout Setup
app.use(expressLayout);
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure the views folder is set
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

// Route Seriess (Note: Make sure this is intentional, as `/seriess` might be a typo)
app.get('/seriess', (req, res) => {
    res.render('components/seriess', {
        title: "Seriess"
    });
});

// Route Admin Login
app.get('/adminlogin', (req, res) => {
    const error = req.query.error || null;  // Set error from query parameter if available
    const redirect = req.query.redirect || '/'; // Set a default redirect or take it from the query
    res.render('adminlogin', {
        title: "Admin Login",
        error: error,
        redirect: redirect  // Pass redirect to the view
    });
});

// Route Admin Register
app.get('/adminregister', (req, res) => {
    const error = req.query.error || null;  // Set error from query parameter if available
    const redirect = req.query.redirect || '/'; // Set a default redirect or take it from the query
    res.render('adminregister', {
        title: "Admin Register",
        error: error,
        redirect: redirect  // Pass redirect to the view
    });
});

app.get("/admindashboard", (req, res) => {
    const visitors = 5000; // Example data for visitors
    const topMovies = [
      {
        _id: "1",
        image: "movie1.jpg",
        name: "Movie 1",
        year: "2024",
        numReviews: 150,
      },
      {
        _id: "2",
        image: "movie2.jpg",
        name: "Movie 2",
        year: "2023",
        numReviews: 200,
      },
    ];
    const allMovies = [
      { numReviews: 150 },
      { numReviews: 200 },
    ];

    const totalCommentsLength = allMovies?.map((m) => m.numReviews);
    const sumOfCommentsLength = totalCommentsLength?.reduce(
      (acc, length) => acc + length,
      0
    );

    // Render the dashboard view and pass the title and other data
    res.render("admindashboard", {
      title: "Admin Dashboard",  // Pass the title
      visitors,
      topMovies,
      sumOfCommentsLength,
    });
});

// Starting the app
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
