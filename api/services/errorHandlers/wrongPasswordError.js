const appError = require('./appError');

class wrongPasswordError extends appError {
  constructor(message) {
    super(message || 'Wrong password!', 403);
  }
}

module.exports = wrongPasswordError;
