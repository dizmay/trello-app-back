const express = require('express');
const router = express.Router();
const assignedUsers = require('../controllers/assignedUsers.controller');

router.post('/', assignedUsers.assignUserToTask);

router.delete('/', assignedUsers.cancelUserAssignment);

module.exports = router;
