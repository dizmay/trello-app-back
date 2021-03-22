const { isEmpty } = require('lodash');
const db = require('../models');
const { columnTitleValidate } = require('../validation/boardColumnValidator');
const errors = require('./errorHandlers');

const createNewColumn = async (title, boardId) => {
  try {
    const error = await columnTitleValidate(title);

    if (!isEmpty(error)) {
      throw new errors.CreateColumnError(error.title)
    }

    const board = await db.boards.findOne({ where: { id: boardId } });

    if (!board) {
      throw new errors.NotFoundError('Board not found!')
    }

    const newColumn = {
      title,
      boardId,
    };
    await db.boardColumns.create(newColumn);
    return 'Column successfully created!'
  }
  catch (error) {
    throw new errors.CreateColumnError(error.message);
  }
}

const getColumns = async (boardId) => {
  try {
    const boardColumns = await db.boardColumns.findAll({
      where: { boardId },
      raw: true,
      attributes: ['id', 'title'],
    })

    if (!boardColumns) {
      return [];
    }

    return boardColumns;
  }
  catch (error) {
    console.log(error.message);
  }
}

const deleteBoardColumn = async (columnId) => {
  try {
    await db.boardColumns.destroy({ where: { id: columnId } });
    return 'Column successfully deleted!'
  }
  catch (error) {
    console.log(error.message);
  }
}

const updateBoardColumn = async (columnId, title) => {
  try {
    const error = await columnTitleValidate(title);

    if (!isEmpty(error)) {
      throw new errors.UpdateColumnError(error.title)
    }

    const column = await db.boardColumns.findOne({
      where: { id: columnId }
    })
    column.title = title;
    await column.save();
    return 'Column successfully updated!'
  }
  catch (error) {
    throw new errors.UpdateColumnError(error.message);
  }
}

module.exports = {
  createNewColumn,
  getColumns,
  deleteBoardColumn,
  updateBoardColumn,
}