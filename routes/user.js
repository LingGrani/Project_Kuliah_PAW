require('dotenv')
const express = require('express')
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  const randomMovieQuery = `
    SELECT * 
    FROM 
      Movie 
    ORDER BY 
      RAND() 
    LIMIT 1;
  `;

  const seriesQuery = `
    SELECT 
      m.movieID, 
      m.title,
      m.thumbnail, 
      COUNT(w.movieID) AS watchlist_count 
    FROM 
      Movie m 
    LEFT JOIN 
      WatchList w 
    ON 
      m.movieID = w.movieID 
    GROUP BY 
      m.movieID, m.title, m.thumbnail 
    ORDER BY 
      watchlist_count DESC;
  `;

  db.query(randomMovieQuery, (err, randomMovieResult) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch random movie' });
      return;
    }

    db.query(seriesQuery, (err, seriesResult) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch series data' });
        return;
      }

      res.json({
        randomMovie: randomMovieResult[0] || null,
        series: seriesResult.map((row) => ({
          movieID: row.movieID,
          title: row.title,
          thumbnail: row.thumbnail,
          watchlist_count: row.watchlist_count
        }))
      });
    });
  });
});

router.get('/movie', (req, res) => {
  const movieQuery = `
    SELECT 
      m.movieID, 
      m.thumbnail, 
      COUNT(w.movieID) AS watchlist_count 
    FROM 
      Movie m 
    LEFT JOIN 
      WatchList w 
    ON 
      m.movieID = w.movieID 
    WHERE 
      m.series = 0 
    GROUP BY 
      m.movieID, m.thumbnail 
    ORDER BY 
      watchlist_count DESC;
  `;
  db.query(movieQuery, (err, movieList) => {
      if (err) return res.status(500).send('Error retrieving user count');
      res.json({
        movieList
      })
  });
});

router.get('/series', (req, res) => {
  const seriesQuery = `
    SELECT 
      m.movieID, 
      m.thumbnail, 
      COUNT(w.movieID) AS watchlist_count 
    FROM 
      Movie m 
    LEFT JOIN 
      WatchList w 
    ON 
      m.movieID = w.movieID 
    WHERE 
      m.series = 1
    GROUP BY 
      m.movieID, m.thumbnail 
    ORDER BY 
      watchlist_count DESC;
  `;
  db.query(seriesQuery, (err, seriesList) => {
      if (err) return res.status(500).send('Error retrieving user count');
      res.json({
        seriesList
      })
  });
});

router.get('/genre', (req, res) => {
  const query = `
    SELECT
      movieID, 
      genre, 
      title,
      thumbnail 
    FROM 
      movie
    ORDER BY 
      genre, title;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }

    // Mengelompokkan film berdasarkan genre
    const groupedMovies = results.reduce((acc, row) => {
      const {movieID, genre, title, thumbnail } = row;

      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(movieID, title, thumbnail);

      return acc;
    }, {});

    // Membentuk format respons sesuai permintaan
    const response = {
      movieList: Object.entries(groupedMovies).map(([genre, movies]) => ({
        genre,
        movieList: movies,
      }))
    };

    res.json(response);
  });
});


module.exports = router;