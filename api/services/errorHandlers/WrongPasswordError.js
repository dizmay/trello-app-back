const AppError = require('./AppError');

class WrongPasswordError extends AppError {
  constructor(message) {
    super(message || 'Wrong password!', 403);
  }
}

module.exports = WrongPasswordError;
