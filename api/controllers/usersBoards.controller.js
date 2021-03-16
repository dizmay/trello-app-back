const { usersBoardsService } = require('../services');

const inviteUser = async (req, res) => {
  const { username, boardId } = req.body;
  const response = await usersBoardsService.inviteUserToBoard(username, boardId);
  res.status(200).send(response);
}

const getBoardUsers = async (req, res) => {
  const { boardId } = req.body;
  const response = await usersBoardsService.getBoardUsers(boardId);
  res.status(200).send(response);
}

module.exports = {
  inviteUser,
  getBoardUsers,
}