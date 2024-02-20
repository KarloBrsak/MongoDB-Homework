const Ad = require('./adSchema');

exports.createAd = async (req, res) => {
  try {
    const newAd = await Ad.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        ad: newAd,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const Ads = await Ad.find();
    res.status(200).json({
      status: 'success',
      data: {
        Ads: Ads,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getAd = async (req, res) => {
  try {
    const Ad = await Ad.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        Ad: Ad,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    Ad.findByIdAndUpdate({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
      data: {
        ad: updatedAd,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
