const AppError = require('./AppError');

class UpdateColumnError extends AppError {
  constructor(message) {
    super(message || 'Column update failed! Internal server error', 500);
  }
}

module.exports = UpdateColumnError;
