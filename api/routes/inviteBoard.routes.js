const express = require('express');
const router = express.Router();
const inviteBoard = require('../controllers/inviteBoard.controller');

router.post('/', inviteBoard.inviteUser);

router.post('/reply', inviteBoard.replyToInvitation);

router.get('/', inviteBoard.getNotifications);

module.exports = router;
