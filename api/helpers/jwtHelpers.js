const jwt = require('jsonwebtoken');
const errors = require('../services/errorHandlers');

const generateToken = ({ id, email, username }) => {
  const token = jwt.sign({ id, email, username }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  })
  return { token };
};

const getTokenFromHeaders = (headers) => {
  try {
    const token = headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    return decoded;
  }
  catch (error) {
    throw new errors.TokenNotValidError();
  }
}

module.exports = {
  generateToken,
  getTokenFromHeaders,
};
