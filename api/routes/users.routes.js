module.exports = app => {
    const users = require('../controllers/users.controller.js');

    const router = require('express').Router();

    router.post('/signup', users.signup);

    router.post('/signin', users.signin);

    app.use('/api', router);
}
