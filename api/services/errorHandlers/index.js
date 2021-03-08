const notFoundError = require('./notFoundError');
const wrongPasswordError = require('./wrongPasswordError');
const userAlreadyExistsError = require('./userAlreadyExistsError');
const signupFailedError = require('./signupFailedError');
const unauthorizedError = require('./unauthorizedError');
const tokenNotValidError = require('./tokenNotValidError');

module.exports = {
  notFoundError,
  wrongPasswordError,
  userAlreadyExistsError,
  signupFailedError,
  unauthorizedError,
  tokenNotValidError,
}