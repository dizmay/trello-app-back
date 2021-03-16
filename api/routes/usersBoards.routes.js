const express = require('express');
const router = express.Router();
const usersBoards = require('../controllers/usersBoards.controller');

router.post('/invite', usersBoards.inviteUser);

router.post('/get', usersBoards.getBoardUsers);

module.exports = router;
