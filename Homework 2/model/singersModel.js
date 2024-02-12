const mongoose = require('mongoose');

const singerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name of the singer.'],
  },
  age: {
    type: Number,
  },
  genre: {
    type: String,
    requires: [true, `Please enter a music genre.`],
  },
});

const Singer = mongoose.model('Singer', singerSchema);
module.exports = Singer;
