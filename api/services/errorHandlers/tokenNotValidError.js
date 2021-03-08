const appError = require('./appError');

class tokenNotValidError extends appError {
  constructor(message) {
    super(message || 'Token not valid.', 401);
  }
}

module.exports = tokenNotValidError;
