const AppError = require('./AppError');

class TokenNotValidError extends AppError {
  constructor(message) {
    super(message || 'Token not valid.', 401);
  }
}

module.exports = TokenNotValidError;
