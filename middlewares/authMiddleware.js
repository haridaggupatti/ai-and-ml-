const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer TOKEN_STRING"
  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  req.user = verifiedToken;
  next();
};

module.exports = authMiddleware;
