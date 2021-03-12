const AppError = require('./AppError');

class BoardCreationError extends AppError {
  constructor(message) {
    super(message || 'Board creation failed! Internal server error', 500);
  }
}

module.exports = BoardCreationError;
