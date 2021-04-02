const AppError = require('./AppError');

class AssignmentError extends AppError {
  constructor(message) {
    super(message || 'Assignment error! Internal server error', 500);
  }
}

module.exports = AssignmentError;

