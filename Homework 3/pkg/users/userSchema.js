const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Must enter a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Must enter an e-mail address'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Enter a valid e-mail address'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Must enter a password'],
    minlength: [8, 'The password must contain at least 8 character'],
    validate: [validator.isStrongPassword, 'Please enter a stronger password'],
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
