const Actor = require('../model/actorsModel');

exports.createActor = async (req, res) => {
  try {
    const newActor = await Actor.create(req.body);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(201).json({
      status: 'success',
      data: { actors: actors },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
