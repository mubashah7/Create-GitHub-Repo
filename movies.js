const express = require('express');
const router = express.Router();
const multer = require('multer');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith('video/') ? 'uploads/videos' : 'uploads/images';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', auth, upload.fields([
  { name: 'sposter', maxCount: 1 },
  { name: 'bposter', maxCount: 1 },
  { name: 'low', maxCount: 1 },
  { name: 'medium', maxCount: 1 },
  { name: 'high', maxCount: 1 }
]), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const movie = new Movie({
      ...data,
      sposter: files.sposter?.[0]?.path,
      bposter: files.bposter?.[0]?.path,
      low: files.low?.[0]?.path,
      medium: files.medium?.[0]?.path,
      high: files.high?.[0]?.path
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating movie', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching movies' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating movie' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting movie' });
  }
});

module.exports = router;