const Singer = require('../model/singersModel');

exports.getSingers = async (req, res) => {
  try {
    const singers = await Singer.find();
    res.render('singers', {
      title: 'All singers',
      singers: singers,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getSingleSinger = async (req, res) => {
  const singer = await Singer.findById(req.params.id);
  res.render('singleSinger', {
    title: singer.name,
    singer,
  });
};

exports.addNewSinger = async (req, res) => {
  const singer = await Singer.create(req.body);
  res.redirect('/singers');
};

exports.deleteSinger = async (req, res) => {
  const singer = await Singer.findByIdAndDelete(req.params.id);
  res.redirect('/singers');
};
