const auth = require('./users.routes');
const boards = require('./boards.routes');
const usersBoards = require('./usersBoards.routes');
const inviteBoard = require('./inviteBoard.routes');
const boardColumns = require('./boardColumns.routes');

module.exports = {
  auth,
  boards,
  usersBoards,
  inviteBoard,
  boardColumns,
}
