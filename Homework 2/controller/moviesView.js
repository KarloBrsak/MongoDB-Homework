const Movie = require('../model/moviesModel');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('movies', {
      title: 'All movies',
      movies: movies,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getSingleMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render('singleMovie', {
    title: movie.title,
    movie,
  });
};

exports.addNewMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.redirect('/movies');
};

exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/movies');
};
