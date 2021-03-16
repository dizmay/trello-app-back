const express = require('express');
const router = express.Router();
const boards = require('../controllers/boards.controller');

router.post('/create', boards.createBoard);

router.get('/get', boards.getBoards);

router.delete('/delete', boards.deleteBoard);

module.exports = router;
