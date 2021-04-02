const { assignedUsersService } = require('../services');

const assignUserToTask = async (req, res) => {
  const { taskId, userId, boardId } = req.body;
  const response = await assignedUsersService.assignUser(taskId, userId, boardId);
  res.status(200).send(response);
}

const cancelUserAssignment = async (req, res) => {
  const { taskId, userId, boardId } = req.query;
  const response = await assignedUsersService.cancelAssignment(taskId, userId, boardId);
  res.status(200).send(response);
}

module.exports = {
  assignUserToTask,
  cancelUserAssignment,
}