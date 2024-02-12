const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name of the actor.'],
  },
  age: {
    type: Number,
  },
  nationality: {
    type: String,
  },
});

const Actor = mongoose.model('Actor', actorSchema);
module.exports = Actor;
