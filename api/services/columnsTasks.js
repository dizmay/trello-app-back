const db = require('../models');

const createColumnTask = async (title, description, boardId) => {
  try {
    const newTask = { title, description, boardId };
    db.columnsTasks.create(newTask);
    return 'Card successfully created!';
  }
  catch (error) {
    console.log(error.message);
  }
}

const getColumnTasks = async (boardId) => {
  try {
    const tasks = await db.columnsTasks.findAll({
      where: { boardId },
      attributes: {
        exclude: ['boardId']
      }
    });
    return tasks;
  }
  catch (error) {
    console.log(error.message);
  }
}

const deleteColumnTask = async (id) => {
  try {
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
    task.save();
    return 'Card successfully updated!';
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createColumnTask,
  getColumnTasks,
  deleteColumnTask,
  updateColumnTask,
}