const appError = require('./appError');

class NotFoundError extends appError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;
