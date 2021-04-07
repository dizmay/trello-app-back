const auth = require('./users.routes');
const boards = require('./boards.routes');
const usersBoards = require('./usersBoards.routes');
const inviteBoard = require('./inviteBoard.routes');
const boardColumns = require('./boardColumns.routes');
const columnsTasks = require('./columnsTasks.routes');
const assignedUsers = require('./assignedUsers.routes');
const comments = require('./comments.routes');

module.exports = {
  auth,
  boards,
  usersBoards,
  inviteBoard,
  boardColumns,
  columnsTasks,
  assignedUsers,
  comments,
}
