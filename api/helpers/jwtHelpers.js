const jwt = require('jsonwebtoken');

const generateToken = ({ id, email, username }) => {
  const token = jwt.sign({ id, email, username }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  })
  return { token };
};

const getTokenFromHeaders = (headers) => {
  const token = headers.authorization.split(' ')[1];
  console.log(token);
  const decoded = jwt.decode(token);
  return decoded;
}

module.exports = {
  generateToken,
  getTokenFromHeaders,
};
