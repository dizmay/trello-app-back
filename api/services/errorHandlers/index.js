const notFoundError = require('./notFoundError');
const wrongPasswordError = require('./wrongPasswordError.js');
const userAlreadyExistsError = require('./userAlreadyExistsError');
const signupFailedError = require('./signupFailedError');

module.exports = {
  notFoundError,
  wrongPasswordError,
  userAlreadyExistsError,
  signupFailedError,
}