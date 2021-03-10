const AppError = require('./AppError');

class SignupFailedError extends AppError {
  constructor(message) {
    super(message || 'Registration failed! Internal server error!', 500);
  }
}

module.exports = SignupFailedError;
