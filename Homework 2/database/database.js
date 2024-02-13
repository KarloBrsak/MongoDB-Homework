const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://kbrsak:apiY4NpHZtVxMnPI@cluster0.pzncpzh.mongodb.net/Homework-2?retryWrites=true&w=majority'
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDatabase };
