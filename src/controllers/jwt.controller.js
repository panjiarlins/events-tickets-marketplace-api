require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtController = {
  generateToken: (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30m' }),

  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return error;
    }
  },
};

module.exports = jwtController;
