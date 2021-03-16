const AppError = require('./AppError');

class GetBoardsError extends AppError {
  constructor(message) {
    super(message || 'Getting boards failed! Internal server error!', 500);
  }
}

module.exports = GetBoardsError;
