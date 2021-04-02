const authService = require('./auth');
const boardService = require('./boards');
const usersBoardsService = require('./usersBoards');
const inviteBoardService = require('./inviteBoard');
const boardColumnsService = require('./boardColumns');
const columnsTasksService = require('./columnsTasks');
const assignedUsersService = require('./assignedUsers');

module.exports = {
  authService,
  boardService,
  usersBoardsService,
  inviteBoardService,
  boardColumnsService,
  columnsTasksService,
  assignedUsersService,
}
