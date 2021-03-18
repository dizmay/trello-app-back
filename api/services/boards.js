const db = require('../models');
const errors = require('../services/errorHandlers');
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

  try {
    const userBoards = await db.usersBoards.findAll({
      where: { userId: user.id },
      plain: true,
      raw: true,
      attributes: [[db.sequelize.literal('json_agg(json_build_object(\'title\', b.title, \'id\', b.id))'), 'boards']],
      include: [
        {
          model: db.users,
          as: "u",
          required: true,
          attributes: {
            exclude: ["id", "username", "email", "password", "createdAt", "updatedAt"]
          },
        },
        {
          model: db.boards,
          as: "b",
          required: true,
          attributes: {
            exclude: ["title", "id"]
          }
        }
      ],
      group: ['u.id'],
    }).then(res => res.boards).catch(err => []);
    return userBoards;
  }
  catch (error) {
    throw new errors.GetBoardsError();
  }
}

const deleteUserBoard = async (id) => {
  try {
    await db.boards.destroy({ where: { id } });
    return true;
  }
  catch (error) {
    throw new errors.BoardDeletionError();
  }
}

module.exports = {
  createBoard,
  getUserBoards,
  deleteUserBoard,
}
