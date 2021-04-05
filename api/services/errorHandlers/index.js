const NotFoundError = require('./NotFoundError');
const WrongPasswordError = require('./WrongPasswordError');
const UserAlreadyExistsError = require('./UserAlreadyExistsError');
const SignupFailedError = require('./SignupFailedError');
const UnauthorizedError = require('./UnauthorizedError');
const TokenNotValidError = require('./TokenNotValidError');
const BoardCreationError = require('./BoardCreationError');
const GetBoardsError = require('./GetBoardsError');
const BoardDeletionError = require('./BoardCreationError');
const BoardInvitationError = require('./BoardInvitationError');
const CreateColumnError = require('./CreateColumnError');
const UpdateColumnError = require('./UpdateColumnError');
const ValidationError = require('./ValidationError');
const AssignmentError = require('./AssignmentError');

module.exports = {
  NotFoundError,
  WrongPasswordError,
  UserAlreadyExistsError,
  SignupFailedError,
  UnauthorizedError,
  TokenNotValidError,
  BoardCreationError,
  GetBoardsError,
  BoardDeletionError,
  BoardInvitationError,
  CreateColumnError,
  UpdateColumnError,
  ValidationError,
  AssignmentError,
}