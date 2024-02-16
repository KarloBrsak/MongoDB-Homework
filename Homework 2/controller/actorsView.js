const Actor = require('../model/actorsModel');

exports.getActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.render('actors', {
      title: 'All actors',
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
  const actor = await Actor.findById(req.params.id);
  res.render('singleActor', {
    title: actor.name,
    actor,
  });
};

exports.addNewActor = async (req, res) => {
  const actor = await Actor.create(req.body);
  res.redirect('/actors');
};

exports.deleteActor = async (req, res) => {
  const actor = await Actor.findByIdAndDelete(req.params.id);
  res.redirect('/actors');
};
