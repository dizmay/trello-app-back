const express = require('express');
const router = express.Router();
const usersBoards = require('../controllers/usersBoards.controller');

router.post('/', usersBoards.getBoardUsers);

module.exports = router;
