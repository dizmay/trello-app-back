const db = require('../models');
const { Op } = require('sequelize');
const errors = require('./errorHandlers');

const assignUser = async (taskId, userId, boardId) => {
  try {
    const assign = { taskId, userId, boardId };
    const response = await db.assignedUsers.create(assign);
    return response;
  }
  catch (error) {
    throw new errors.AssignmentError(error.message);
  }
}

const cancelAssignment = async (taskId, userId, boardId) => {
  try {
    await db.assignedUsers.destroy({
      where: {
        [Op.and]: [
          { boardId },
          { taskId },
          { userId }
        ]
      }
    })
    return 'Assignment was cancelled!';
  }
  catch (error) {
    throw new errors.AssignmentError(error.message);
  }
}

module.exports = {
  assignUser,
  cancelAssignment,
}