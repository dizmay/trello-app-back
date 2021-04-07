const db = require("../models");

const createComment = async (userId, text, taskId, boardId, columnId) => {
  try {
    const newComment = { text, userId, taskId, boardId, columnId };
    const response = await db.comments.create(newComment);
    return response;
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = {
  createComment,
}