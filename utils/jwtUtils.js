const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 64) {
  throw new Error('JWT_SECRET is undefined or too short. Please set a proper JWT_SECRET in your .env file.'); // INPUT_REQUIRED {Set a proper JWT_SECRET in your .env file that is at least 64 characters long}
}

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
