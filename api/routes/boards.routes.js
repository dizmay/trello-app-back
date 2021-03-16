const express = require('express');
const router = express.Router();
const boards = require('../controllers/boards.controller');

router.post('/', boards.createBoard);

router.get('/', boards.getBoards);

router.delete('/', boards.deleteBoard);

module.exports = router;
