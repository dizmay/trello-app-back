const db = require('../models');
const errors = require('./errorHandlers');

const getBoardUsers = async (boardId) => {
  try {
    const usernames = await db.usersBoards.findAll({
      where: { boardId },
      raw: true,
      attributes: ['u.id', 'u.username'],
      include: [
        {
          model: db.users,
          as: 'u',
          attributes: [],
        }
      ]
    })
    return usernames;
  }
  catch (error) {
    throw new errors.GetBoardsError();
  }
}

module.exports = {
  getBoardUsers,
}