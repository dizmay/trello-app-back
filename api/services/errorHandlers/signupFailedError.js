const appError = require('./appError');

class signupFailedError extends appError {
  constructor(message) {
    super(message || 'Registration failed.', 500);
  }
}

module.exports = signupFailedError;
