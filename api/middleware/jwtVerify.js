const jwt = require('jsonwebtoken');
const { unauthorizedError, tokenNotValidError } = require('../services/errorHandlers');

const jwtVerify = (req, res, next) => {
  try {
    if(!req.headers.Authorization) {
      throw new unauthorizedError();
    }

  const token = req.headers.Authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET);
  next()
  }
  catch(error) {
    throw new tokenNotValidError();
  }
}

module.exports = jwtVerify;
