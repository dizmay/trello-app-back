const db = require('../models');
const errors = require('../services/errorHandlers');
const jwt = require('jsonwebtoken');
const { jwtHelpers } = require('../helpers/index');

const createBoard = async ({ id, userId, title }) => {

  const newBoard = {
    title,
  }

  const newUserBoard = {
    userId,
    boardId: null,
  }

  try {
    const board = await db.boards.create(newBoard);
    // board.dataValues.id
    newUserBoard.boardId = board.dataValues.id;
    await db.usersBoards.create(newUserBoard);
    const response = 'Board successfully created';
    return response;
  }
  catch (error) {
    throw new errors.BoardCreationError(error);
  }
}

const getUserBoards = async (headers) => {
  const user = jwtHelpers.getTokenFromHeaders(headers);
  const userBoards = await db.users.findByPk(user.id, {
    include: [
      {
        model: db.boards,
        attributes: ['title'],
      }
    ]
  })

  const response = userBoards.boards.map(e => e.dataValues.title)
  return response;
}

module.exports = {
  createBoard,
  getUserBoards,
}
