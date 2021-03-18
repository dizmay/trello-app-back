const db = require('../models');
const { jwtHelpers, dbHelpers } = require('../helpers');
const errors = require('./errorHandlers');

const inviteUserToBoard = async (username, boardId, userId) => {
  try {
    const user = await db.users.findOne({ where: { username } });
    const inviteUserBoard = {
      reqUserId: userId,
      resUserId: user.id,
      boardId: boardId,
    }
    const res = await db.inviteBoard.create(inviteUserBoard);
    return res;
  }
  catch (error) {
    throw new errors.BoardInvitationError(error);
  }
}

const getUserNotifications = async (headers) => {
  try {
    const user = jwtHelpers.getTokenFromHeaders(headers);
    const notifications = await db.inviteBoard.findAll({
      where: { resUserId: user.id },
      raw: true,
      plain: true,
      attributes: [[db.sequelize.literal('json_agg(json_build_object(\'username\', requser.username, \'title\', b.title, \'invId\', "inviteBoard"."invId"))'), 'notifications']],
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
  console.log(isAccepted, invId);
  try {
    if (isAccepted) {
      const invite = await db.inviteBoard.findOne({ where: { invId } });
      console.log(invite);
      const usersBoards = { userId: invite.resUserId, boardId: invite.boardId };
      const response = await db.usersBoards.create(usersBoards);
      await db.inviteBoard.destroy({ where: { invId } });
      return response;
    }
    else {
      await db.inviteBoard.destroy({ where: { invId } });
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
