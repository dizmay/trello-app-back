const db = require('../models');
const errors = require('./errorHandlers');
const { renameObjectKey } = require('../utils');

const getBoardUsers = async (boardId) => {
  try {
    const usernames = await db.usersBoards.findAll({
      where: { boardId },
      raw: true,
      attributes: [],
      include: [
        {
          model: db.users,
          as: 'u',
          attributes: ['id', 'username'],
        }
      ]
    }).then(res => res.map(user => {
      let arr = renameObjectKey(user, 'u.id', 'id');
      arr = renameObjectKey(arr, 'u.username', 'username');
      return arr;
    }));
    return usernames;
  }
  catch (error) {
    throw new errors.GetBoardsError();
  }
}

module.exports = {
  getBoardUsers,
}