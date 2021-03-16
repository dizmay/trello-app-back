const AppError = require('./AppError');

class BoardInvitationError extends AppError {
  constructor(message) {
    super(message || 'Board invitation failed! Internal server error', 500);
  }
}

module.exports = BoardInvitationError;
