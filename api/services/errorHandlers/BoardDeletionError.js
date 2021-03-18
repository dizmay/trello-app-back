const AppError = require('./AppError');

class BoardDeletionError extends AppError {
  constructor(message) {
    super(message || 'Board deletion failed! Internal server error', 500);
  }
}

module.exports = BoardDeletionError;
