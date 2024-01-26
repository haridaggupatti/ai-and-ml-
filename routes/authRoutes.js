const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const winston = require('winston');
const router = express.Router();

// Simple logger setup
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user = new User({ username, password: hash });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error registering new user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (isMatch && !err) {
        const token = generateToken(user);
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error logging in user' });
  }
});

module.exports = router;
