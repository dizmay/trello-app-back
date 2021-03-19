const express = require('express');
const router = express.Router();
const boardColumns = require('../controllers/boardColumns.controller');

router.post('/create', boardColumns.createColumn);

router.post('/get', boardColumns.getBoardColumns);

router.delete('/delete', boardColumns.deleteColumn);

router.put('/update', boardColumns.updateColumn);

module.exports = router;
