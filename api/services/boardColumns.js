const { isEmpty } = require('lodash');
const db = require('../models');
const { columnTitleValidate } = require('../validation/boardColumnValidator');
const errors = require('./errorHandlers');
const { columnsDnD } = require('../utils/columnsDnD');

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
      attributes: ['id', 'title'],
      include: [
        {
          model: db.columnsTasks,
          as: 'tasks',
          attributes: [[db.sequelize.literal('json_agg(json_build_object(\'id\', tasks.id, \'title\', tasks.title, \'description\', tasks.description))'), 'tasks']],
        }
      ],
      raw: true,
      group: ['"boardColumns".id'],
    })

    if (!boardColumns) {
      return [];
    }

    await boardColumns.forEach(item => item['tasks.tasks'].sort((a, b) => a.id - b.id));
    return boardColumns;
  }
  catch (error) {
    console.log(error.message);
  }
}

const deleteBoardColumn = async (columnId) => {
  try {
    await db.columnsTasks.destroy({ where: { columnId } })
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

const boardColumnDND = async (dragId, dropId, boardId) => {
  try {
    const boardColumns = await db.boardColumns.findAll({ where: { boardId } });
    const columns = boardColumns.map(el => el.dataValues);
    const difference = columnsDnD(dragId, dropId, columns);
    console.log(difference);
    // const response = await boardColumns.map(async column => {
    //   await difference.map(async diff => {
    //     if (diff.id === column.id) {
    //       column.prevId = diff.prevId;
    //       column.nextId = diff.nextId;
    //     }
    //     return await diff;
    //   });
    //   await column.save();
    //   console.log(1);
    //   return await column;
    // });
    const response = difference.map(async diff => {
      console.log(diff.id);
      await db.boardColumns.update({ prevId: diff.prevId, nextId: diff.nextId }, { where: { id: diff.id } });
    });
    console.log(response);
    return await response;
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
  boardColumnDND,
}