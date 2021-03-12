const NotFoundError = require('./NotFoundError');
const WrongPasswordError = require('./WrongPasswordError');
const UserAlreadyExistsError = require('./UserAlreadyExistsError');
const SignupFailedError = require('./SignupFailedError');
const UnauthorizedError = require('./UnauthorizedError');
const TokenNotValidError = require('./TokenNotValidError');
const BoardCreationError = require('./BoardCreationError');

module.exports = {
  NotFoundError,
  WrongPasswordError,
  UserAlreadyExistsError,
  SignupFailedError,
  UnauthorizedError,
  TokenNotValidError,
  BoardCreationError,
}