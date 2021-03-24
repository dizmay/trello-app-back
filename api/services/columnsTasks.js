const db = require('../models');

const createColumnTask = async (title, description, columnId) => {
  try {
    const newTask = { title, description, columnId };
    db.columnsTasks.create(newTask);
    return 'Card successfully created!';
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
    await task.save();
    return 'Card successfully updated!';
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createColumnTask,
  deleteColumnTask,
  updateColumnTask,
}