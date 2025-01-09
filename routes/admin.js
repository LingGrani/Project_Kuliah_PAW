require('dotenv')
const express = require('express')
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
    return res.render('admin/index');
});

router.use((req, res, next) => {
    req.app.set('layout', 'layouts/admin-layout');
    next();
});

// Endpoint untuk menambahkan movie baru
router.post('/movie', (req, res) => {
  const { title, releaseYear, description, thumbnail, cbfc, series, genreId } = req.body;

  if (!title || !releaseYear || !description) {
    res.status(400).json({ error: 'Title, releaseYear, and description are required' });
    return;
  }

  const query = `
    INSERT INTO Movie (title, releaseYear, description, thumbnail, cbfc, series, genreId) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [title, releaseYear, description, thumbnail || null, cbfc || null, series || 0, genreId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add movie' });
      return;
    }

    res.status(201).json({ message: 'Movie added successfully', movieID: result.insertId });
  });
});

router.put('/movie/:id', (req, res) => {
    const movieID = req.params.id; // Ambil movieID dari URL parameter
    const { title, releaseYear, description, thumbnail, cbfc, series, genreId } = req.body;
  
    if (!title || !releaseYear || !description) {
      res.status(400).json({ error: 'Title, releaseYear, and description are required' });
      return;
    }
  
    const query = `
      UPDATE Movie 
      SET title = ?, releaseYear = ?, description = ?, thumbnail = ?, cbfc = ?, series = ?, genreId = ?
      WHERE movieID = ?;
    `;
  
    const values = [
      title, 
      releaseYear, 
      description, 
      thumbnail || null, 
      cbfc || null, 
      series || 0, 
      genreId, 
      movieID
    ];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update movie' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Movie not found' });
        return;
      }
  
      res.status(200).json({ message: 'Movie updated successfully' });
    });
  });

router.delete('/movie/:id', (req, res) => {
    db.query('DELETE FROM movie WHERE movieID = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Tugas tidak ditemukan');
        res.status(204).send();
    });
});


/////////////////////////video///////////////////////////
// Endpoint untuk menambahkan video baru
router.post('/video', (req, res) => {
    const { movieID, videoTitle, episodeNumber, duration, videoLink, seasonIndex, thumbnail } = req.body;
  
    if (!movieID || !videoTitle || !episodeNumber || !duration || !videoLink) {
      res.status(400).json({ error: 'movieID, videoTitle, episodeNumber, duration, and videoLink are required' });
      return;
    }
  
    const query = `
      INSERT INTO Video (movieID, videoTitle, episodeNumber, duration, videoLink, seasonIndex, thumbnail) 
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
  
    const values = [movieID, videoTitle, episodeNumber, duration, videoLink, seasonIndex || 0, thumbnail || null];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add video' });
        return;
      }
  
      res.status(201).json({ message: 'Video added successfully', videoID: result.insertId });
    });
  });
  
  // Endpoint untuk memperbarui video
  router.put('/video/:id', (req, res) => {
    const videoID = req.params.id; // Ambil videoID dari URL parameter
    const { movieID, videoTitle, episodeNumber, duration, videoLink, seasonIndex, thumbnail } = req.body;
  
    if (!movieID || !videoTitle || !episodeNumber || !duration || !videoLink) {
      res.status(400).json({ error: 'movieID, videoTitle, episodeNumber, duration, and videoLink are required' });
      return;
    }
  
    const query = `
      UPDATE Video 
      SET movieID = ?, videoTitle = ?, episodeNumber = ?, duration = ?, videoLink = ?, seasonIndex = ?, thumbnail = ? 
      WHERE videoID = ?;
    `;
  
    const values = [
      movieID, 
      videoTitle, 
      episodeNumber, 
      duration, 
      videoLink, 
      seasonIndex || 0, 
      thumbnail || null, 
      videoID
    ];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update video' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Video not found' });
        return;
      }
  
      res.status(200).json({ message: 'Video updated successfully' });
    });
  });
  
  // Endpoint untuk menghapus video
  router.delete('/video/:id', (req, res) => {
    db.query('DELETE FROM Video WHERE videoID = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).send('Internal Server Error');
      if (results.affectedRows === 0) return res.status(404).send('Video not found');
      res.status(204).send();
    });
  });
  

////////////////////GENRE///////////////////////////
router.post('/genre', (req, res) =>{
  const { genreName } = req.body;
  if (!genreName) {
      return res.status(400).send('Nama harus diisi.');
  }
  const query = 'INSERT INTO genre (genreName) VALUES (?)';
  const values = [genreName];

  db.query(query, values, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Internal Server Error');
      }

      const newData = {
          genreName: genreName,
      };

      res.status(201).json(newData);
  });
})
////////////////////GENRE///////////////////////////


module.exports = router;