const express = require('express');
const router = express.Router();
const columnsTasks = require('../controllers/columnsTasks.controller');

router.post('/', columnsTasks.createTask);

router.delete('/', columnsTasks.deleteTask);

router.put('/', columnsTasks.updateTask);

router.put('/move-card', columnsTasks.moveCard);

module.exports = router;
