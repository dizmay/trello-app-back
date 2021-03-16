const db = require('../models');
const errors = require('./errorHandlers');

const inviteUserToBoard = async (username, boardId) => {
  try {
    const user = await db.users.findOne({ where: { username } });
    const userBoard = { userId: user.id, boardId };
    const test = await db.usersBoards.create(userBoard);
    return test
  }
  catch (error) {
    throw new errors.BoardInvitationError();
  }
}

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
          attributes: ['username'],
        }
      ]
    }).then(res => res.map(e => e['u.username'])).catch(err => []);
    return usernames;
  }
  catch (error) {
    throw new errors.GetBoardsError();
  }
}

module.exports = {
  inviteUserToBoard,
  getBoardUsers,
}