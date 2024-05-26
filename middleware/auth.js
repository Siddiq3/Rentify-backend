const jwt = require('jsonwebtoken');
const User = require('../models/Property');
const { v4: uuidv4 } = require('uuid');

// Generate a secret key using UUID
const secretKey = uuidv4();
console.log(secretKey); // Output: a randomly generated UUID

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Token not provided');

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
