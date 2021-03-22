const express = require('express');
const router = express.Router();
const boardColumns = require('../controllers/boardColumns.controller');

router.post('/', boardColumns.createColumn);

router.get('/', boardColumns.getBoardColumns);

router.delete('/', boardColumns.deleteColumn);

router.put('/', boardColumns.updateColumn);

module.exports = router;
