const { commentsService } = require('../services');

const createComment = async (req, res) => {
  const { userId, text, taskId, boardId, columnId } = req.body;
  const response = await commentsService.createComment(userId, text, taskId, boardId, columnId);
  res.status(200).send(response);
}

module.exports = {
  createComment,
}