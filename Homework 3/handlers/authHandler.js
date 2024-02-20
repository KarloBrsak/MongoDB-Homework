const User = require('../pkg/users/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    //? Check if password and e-mail are entered
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Please add your e-mail and password');
    }
    //? Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password!');
    }
    //? Compare password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password!');
    }
    //? Generate and send token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    //? Send cookies with token
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    //? Send response and token
    res.status(201).json({
      status: 'success',
      token,
    });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};
