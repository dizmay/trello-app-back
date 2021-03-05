const appError = require('./appError');

class userAlreadyExistsError extends appError {
  constructor(message) {
    super(message || 'User already exists.', 400);
  }
}

module.exports = userAlreadyExistsError;
