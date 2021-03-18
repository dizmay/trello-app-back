const { usersBoardsService } = require('../services');

const getBoardUsers = async (req, res) => {
  const { boardId } = req.body;
  const response = await usersBoardsService.getBoardUsers(boardId);
  res.status(200).send(response);
}

module.exports = {
  getBoardUsers,
}