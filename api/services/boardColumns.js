const { isEmpty, isNull } = require('lodash');
const db = require('../models');
const { columnTitleValidate } = require('../validation/boardColumnValidator');
const errors = require('./errorHandlers');
const { changeColumnPosition, sortList, removeListElement } = require('../utils');
const { Op } = require('sequelize');

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

    const lastColumn = await db.boardColumns.findOne({
      where: {
        [Op.and]: [
          { nextId: null },
          { boardId },
        ]
      }
    });

    const newColumn = {
      title,
      boardId,
      prevId: isNull(lastColumn) ? null : lastColumn.id,
      nextId: null,
    };
    const createdColumn = await db.boardColumns.create(newColumn);

    if (!isNull(lastColumn)) {
      lastColumn.nextId = createdColumn.id;
      await lastColumn.save();
    }

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
      attributes: ['id', 'title', 'prevId', 'nextId'],
      include: [
        {
          model: db.columnsTasks,
          as: 'tasks',
          attributes: [[db.sequelize.literal('json_agg(json_build_object(\'id\', tasks.id, \'title\', tasks.title, \'description\', tasks.description))'), 'tasks']],
        }
      ],
      raw: true,
      group: ['"boardColumns".id'],
    }).then(res => sortList(res));

    if (!boardColumns) {
      return [];
    }

    await boardColumns.forEach(item => item['tasks.tasks'].sort((a, b) => a.id - b.id));
    return boardColumns;
  }
  catch (error) {
    console.log(error);
  }
}

const deleteBoardColumn = async (columnId, boardId) => {
  try {
    const boardColumns = await db.boardColumns.findAll({ where: { boardId } });
    const columns = boardColumns.map(el => el.dataValues);
    const removalChanges = removeListElement(columnId, columns);
    Promise.all(removalChanges.map(async change => {
      await db.boardColumns.update({ prevId: change.prevId, nextId: change.nextId }, { where: { id: change.id } });
    }));
    await db.columnsTasks.destroy({ where: { columnId } });
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

const changeColumnOrder = async (dragId, dropId, boardId) => {
  try {
    const boardColumns = await db.boardColumns.findAll({ where: { boardId } });
    const columns = sortList(boardColumns.map(el => el.dataValues));
    const difference = changeColumnPosition(dragId, dropId, columns);
    const response = await Promise.all(difference.map(async diff => {
      await db.boardColumns.update({ prevId: diff.prevId, nextId: diff.nextId }, { where: { id: diff.id } });
      return diff;
    }));
    return response;
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createNewColumn,
  getColumns,
  deleteBoardColumn,
  updateBoardColumn,
  changeColumnOrder,
}