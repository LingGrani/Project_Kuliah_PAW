require('dotenv').config();
const express = require('express');
const expressLayout = require("express-ejs-layouts");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database/db');
const admin = require('./routes/admin.js');

// Layout Setup
app.use(expressLayout);
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure the views folder is set
app.set("layout", "./layouts/main");
app.use(express.urlencoded({ extended: true }));


// Access Static folder
app.use(express.static("public"));

// Route Group
app.use('/admin-crud', require('./routes/admin'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user.js'))

// Route Home
app.get('/', (req, res) => {
    res.render('index', {
        title: "HomePage",
        isNavbarPage: false,
        isFooterPage: false,
    });
});

// Route Movies
app.get('/movies', (req, res) => {
    res.render('movies', {
        title: "Movie",
        isNavbarPage: false,
        isFooterPage: false,
    });
});

// Route Genre
app.get('/genre', (req, res) => {
    res.render('genre', {
        title: "Genre",
        isNavbarPage: false,
        isFooterPage: false,
    });
});

// Route Watchlist
app.get('/watchlist', (req, res) => {
    res.render('watchlist', {
        title: "Watchlist",
        isNavbarPage: false,
        isFooterPage: false,
    });
});

// Route Homepage
// app.get('/index', (req, res) => {
//     res.render('index', {
//         title: "Index",
//         isNavbarPage: false,
//         isFooterPage: false,
//     });
// });

// Route Series
app.get('/series', (req, res) => {
    res.render('series', {
        title: "Series",
        isNavbarPage: false,
        isFooterPage: false,
    });
});

app.get('/movie/:id', (req, res) => {
    const movieId = req.params.id;
    
    // Query untuk mendapatkan film berdasarkan movieID
    db.query('SELECT * FROM movie WHERE movieID = ?', [movieId], (err, movieResults) => {
        if (err) {
            console.error('Error fetching movie:', err);
            return res.status(500).send('Error fetching movie');
        }
        
        // Cek apakah film ditemukan
        if (movieResults.length === 0) {
            return res.status(404).send('Movie not found');
        }

        const movie = movieResults[0]; // Mengambil data film yang ditemukan
        
        // Query untuk mengambil episode terkait film tersebut
        db.query('SELECT * FROM video WHERE movieID = ?', [movieId], (err, episodeResults) => {
            if (err) {
                console.error('Error fetching episodes:', err);
                return res.status(500).send('Error fetching episodes');
            }

            // Render halaman movie dengan data film dan episode yang ditemukan
            res.render('components/movie', {
                title: movie.title,  // Menggunakan title film yang ditemukan
                isNavbarPage: false,
                isFooterPage: false,
                movie: movie,        // Mengirimkan data film
                episodes: episodeResults  // Mengirimkan data episode terkait
            });
        });
    });
});


// Route Seriess (Note: Make sure this is intentional, as `/seriess` might be a typo)
app.get('/seriess', (req, res) => {
    res.render('components/seriess', {
        title: "Seriess",
        isNavbarPage: false,
        isFooterPage: false,
    });
});

// Route Admin Login
app.get('/adminlogin', (req, res) => {
    const error = req.query.error || null;  // Set error from query parameter if available
    const redirect = req.query.redirect || '/'; // Set a default redirect or take it from the query
    res.render('adminlogin', {
        title: "Admin Login",
        error: error,
        redirect: redirect,  // Pass redirect to the view
        isNavbarPage: true,
        isFooterPage: false,
    });
});

// Route Admin Register
app.get('/adminregister', (req, res) => {
    const error = req.query.error || null;  // Set error from query parameter if available
    const redirect = req.query.redirect || '/'; // Set a default redirect or take it from the query
    res.render('adminregister', {
        title: "Admin Register",
        error: error,
        redirect: redirect,  // Pass redirect to the view
        isNavbarPage: true,
        isFooterPage: false,
    });
});

// Route Admin Dashboard
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
    res.render("admin/admindashboard", {
        layout: "layouts/admin-layout.ejs",
        title: "Admin Dashboard",  // Pass the title
        visitors,
        topMovies,
        sumOfCommentsLength,
        isNavbarPage: true, 
        isFooterPage: true,
    });
});

// Routing Upload Admin
app.get('/uploadadmin', (req, res) => {
    db.query('SELECT * FROM genre', (err, genres) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('admin/uploadadmin', {
            layout: "layouts/admin-layout.ejs",
            title: "UploadAdmin",
            isNavbarPage: true,
            isFooterPage: true,
            genres: genres
        });
    })
});

// Routing Update Admin
app.get('/updateadmin', (req, res) => {
    db.query('SELECT * FROM genre', (err, genres) => {
        if (err) return res.status(500).send('Internal Server Error');
        
        const movieId = req.query.id;
        db.query('SELECT * FROM movie where movieID = ?',movieId, (err, movie) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.render('admin/updateadmin', {
                layout: "layouts/admin-layout.ejs",
                title: "UpdateAdmin",
                isNavbarPage: true,
                isFooterPage: true,
                movies: movie,
                genres: genres
            });
        })
    })
});

// Routing Update Series Admin
app.get('/uploadvideo', (req, res) => {
    db.query('SELECT * FROM movie', (err, movies) => {
        if (err) return res.status(500).send('Internal Server Error');
        db.query('SELECT * FROM video', (err, videos) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.render('admin/uploadvideo', {
                layout: "layouts/admin-layout.ejs",
                title: "uploadvideo",
                isNavbarPage: true,
                isFooterPage: true,
                videos: videos,
                movies: movies
            });
        })
    })
});

// Routing Genre Admin
app.get('/admingenre', (req, res) => {
    db.query('SELECT * FROM genre', (err, genres) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('admin/admingenre', {
            layout: "layouts/admin-layout.ejs",
            title: "AdminGenre",
            isNavbarPage: true,
            isFooterPage: true,
            genres:genres
        });
    })
});


// Routing All Movies
app.get('/allmovie', (req, res) => {
    db.query('SELECT * FROM movie where series = 0', (err,movies) =>{
        if (err) return res.status(500).send('Internal Server Error');
        db.query('SELECT * FROM movie where series = 1', (err,series) =>{
            if (err) return res.status(500).send('Internal Server Error');
            res.render('admin/allmovie', {
                layout: "layouts/admin-layout.ejs",  // Pastikan layout yang sesuai
                title: "All Movies and Series",  // Judul halaman
                movies: movies,
                series: series,
                isNavbarPage: true,  // Flag untuk menampilkan navbar
                isFooterPage: true,  // Flag untuk menampilkan footer
            });
        })
    }) 
   
});

// Starting the app
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
