const db = require('../models');
const { Op } = require('sequelize');

const assignUser = async (taskId, userId, boardId) => {
  try {
    const assign = { taskId, userId, boardId };
    const response = await db.assignedUsers.create(assign);
    return response;
  }
  catch (error) {
    console.log(error.message);
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
    console.log(error.message)
  }
}

module.exports = {
  assignUser,
  cancelAssignment,
}