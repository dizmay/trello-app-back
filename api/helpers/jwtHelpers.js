const jwt = require('jsonwebtoken');

const generateToken = ({ id, email, username }) => {
  const token = jwt.sign({ id, email, username }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  })
  return { token };
};

module.exports = {
  generateToken,
};
