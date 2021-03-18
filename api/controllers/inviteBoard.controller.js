const { inviteBoardService } = require('../services');

const inviteUser = async (req, res) => {
  const { username, boardId, userId } = req.body;
  const response = await inviteBoardService.inviteUserToBoard(username, boardId, userId);
  res.status(200).send(response);
}

const getNotifications = async (req, res) => {
  const response = await inviteBoardService.getUserNotifications(req.headers);
  res.status(200).send(response);
}

const replyToInvitation = async (req, res) => {
  const { invId, isAccepted } = req.body;
  const response = await inviteBoardService.invitationReply(invId, isAccepted);
  res.status(200).send(response);
}

module.exports = {
  inviteUser,
  getNotifications,
  replyToInvitation,
}