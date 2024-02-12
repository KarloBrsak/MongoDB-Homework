const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name of the movie.'],
  },
  year: {
    type: Number,
    required: [true, 'Please enter the year when the movie was released.'],
  },
  director: {
    type: String,
    required: [true, "Please enter the movie's director"],
  },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
