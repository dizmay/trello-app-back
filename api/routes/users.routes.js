const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');

router.post('/signup', users.signUp);

router.post('/signin', users.signIn);

module.exports = router;
