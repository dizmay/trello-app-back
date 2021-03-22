const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message) {
    super(message || 'Validation error', 400);
  }
}

module.exports = ValidationError;
