// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Movie', movieSchema);