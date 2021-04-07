const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments.controller');

router.post('/', comments.createComment);

module.exports = router;
