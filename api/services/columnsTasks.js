const db = require('../models');
const { changePosition, isNull, sortList, removeListElement, pushElementInList, changeCardPosition } = require('../utils');
const { Op } = require('sequelize')

const createColumnTask = async (title, description, columnId, boardId) => {
  try {
    const lastTask = await db.columnsTasks.findOne({
      where: {
        [Op.and]: [
          { nextId: null },
          { columnId },
        ]
      }
    });
    const newTask = {
      title,
      description,
      columnId,
      prevId: isNull(lastTask) ? null : lastTask.id,
      nextId: null,
    };
    const createdCard = await db.columnsTasks.create(newTask);

    if (!isNull(lastTask)) {
      lastTask.nextId = createdCard.id;
      await lastTask.save();
    }

    return 'Card successfully created!';
  }
  catch (error) {
    console.log(error.message);
  }
}

const deleteColumnTask = async (id, columnId) => {
  try {
    const columnsTasks = await db.columnsTasks.findAll({ where: { columnId } });
    const tasks = sortList(columnsTasks.map(el => el.dataValues));
    const removalChanges = removeListElement(id, tasks);
    Promise.all(removalChanges.map(async change => {
      await db.columnsTasks.update({ prevId: change.prevId, nextId: change.nextId }, { where: { id: change.id } });
    }));
    await db.assignedUsers.destroy({ where: { taskId: id } });
    await db.columnsTasks.destroy({ where: { id } });
    return 'Card successfully deleted!';
  }
  catch (error) {
    console.log(error.message);
  }
}

const updateColumnTask = async (id, title, description) => {
  try {
    const task = await db.columnsTasks.findOne({ where: { id } });
    task.title = title;
    task.description = description;
    await task.save();
    return 'Card successfully updated!';
  }
  catch (error) {
    console.log(error.message);
  }
}

const moveColumnTask = async (dragId, dropId, dragColumnId, dropColumnId, side) => {
  try {
    const dragColumnTasks = await db.columnsTasks.findAll({ where: { columnId: dragColumnId } });
    const dragTasks = sortList(dragColumnTasks.map(el => el.dataValues));
    if (dragColumnId === dropColumnId) {
      const difference = changeCardPosition(dragId, dropId, dragTasks, side);
      const response = await Promise.all(
        difference.map(async diff => {
          await db.columnsTasks.update({ prevId: diff.prevId, nextId: diff.nextId }, { where: { id: diff.id } });
          return diff;
        })
      );
      return response;
    }
    const dragElement = await db.columnsTasks.findOne({ where: { id: dragId }, raw: true });
    const dropColumnTasks = await db.columnsTasks.findAll({ where: { columnId: dropColumnId } });
    const dropTasks = sortList(dropColumnTasks.map(el => el.dataValues));
    const dropTasksTemp = pushElementInList(dragElement, dropTasks);
    const removeDifferences = removeListElement(dragId, dragTasks);
    const positionDifferences = changeCardPosition(dragId, dropId, dropTasksTemp, side);
    const difference = [...new Set(removeDifferences.concat(positionDifferences))];
    const response = await Promise.all(
      difference.map(async diff => {
        await db.columnsTasks.update({ prevId: diff.prevId, nextId: diff.nextId }, { where: { id: diff.id } });
        await db.columnsTasks.update({ columnId: dropColumnId }, { where: { id: dragId } });
        return diff;
      })
    );
    return response;
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createColumnTask,
  deleteColumnTask,
  updateColumnTask,
  moveColumnTask,
}