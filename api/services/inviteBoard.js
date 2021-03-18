const db = require('../models');
const { jwtHelpers, dbHelpers } = require('../helpers');
const errors = require('./errorHandlers');
const { isNull } = require('lodash');

const inviteUserToBoard = async (username, boardId, userId) => {
  try {
    const user = await db.users.findOne({ where: { username } });
    
    if (isNull(user)) {
      throw new errors.NotFoundError('User not found!');
    }

    const inviteUserBoard = {
      reqUserId: userId,
      resUserId: user.id,
      boardId: boardId,
    }
    const res = await db.inviteBoard.create(inviteUserBoard);
    return res;
  }
  catch (error) {
    throw new errors.BoardInvitationError(error.message);
  }
}

const getUserNotifications = async (headers) => {
  try {
    const user = jwtHelpers.getTokenFromHeaders(headers);
    const notifications = await db.inviteBoard.findAll({
      where: { resUserId: user.id },
      raw: true,
      plain: true,
      attributes: [[db.sequelize.literal('json_agg(json_build_object(\'username\', requser.username, \'title\', b.title, \'invId\', "inviteBoard"."id"))'), 'notifications']],
      include: [
        {
          model: db.users,
          as: 'requser',
          required: true,
          attributes: []
        },
        {
          model: db.boards,
          as: 'b',
          required: true,
          attributes: []
        },
      ],
      group: ['resUserId']
    }).then(res => res.notifications).catch(res => []);
    return notifications;
  }
  catch (error) {
    console.log(error);
  }
}

const invitationReply = async (invId, isAccepted) => {
  try {
    if (isAccepted) {
      const invite = await db.inviteBoard.findOne({ where: { id: invId } });
      const usersBoards = { userId: invite.resUserId, boardId: invite.boardId };
      const response = await db.usersBoards.create(usersBoards);
      await db.inviteBoard.destroy({ where: { id: invId } });
      return response;
    }
    else {
      await db.inviteBoard.destroy({ where: { id: invId } });
      return true;
    }
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  inviteUserToBoard,
  getUserNotifications,
  invitationReply
}
