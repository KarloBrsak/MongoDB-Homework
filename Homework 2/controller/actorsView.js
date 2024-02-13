const Actor = require('../model/actorsModel');

exports.getActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.render('actors', {
      title: 'All actors',
      year: '2024',
      actors: actors,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getSingleActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    res.render('singleActor', { actor });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
