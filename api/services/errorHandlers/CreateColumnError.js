const AppError = require('./AppError');

class CreateColumnError extends AppError {
  constructor(message) {
    super(message || 'Column creation failed! Internal server error', 500);
  }
}

module.exports = CreateColumnError;
