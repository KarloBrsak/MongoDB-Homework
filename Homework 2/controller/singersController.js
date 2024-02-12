const Singer = require('../model/singersModel');

exports.createSinger = async (req, res) => {
  try {
    const newSinger = await Singer.create(req.body);
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

exports.getSingers = async (req, res) => {
  try {
    const singers = await Singer.find();
    res.status(201).json({
      status: 'success',
      data: { singers: singers },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
