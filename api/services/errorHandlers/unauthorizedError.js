const appError = require('./appError');

class unauthorizedError extends appError {
  constructor(message) {
    super(message || 'Unauthorized.', 401);
  }
}

module.exports = unauthorizedError;
