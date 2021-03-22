const { isEmpty } = require('lodash');
const { columnsTasksService } = require('../services');
const { taskValidate } = require('../validation/columnsTasksValidator');
const errors = require('../services/errorHandlers');

const createTask = async (req, res) => {
  const { title, description, boardId } = req.body;
  const error = taskValidate(title, description);

  if(!isEmpty(error)) {
    throw new errors.ValidationError(error.title);
  }

  const response = await columnsTasksService.createColumnTask(title, description, boardId);
  res.status(200).send(response);
}

const getTasks = async (req, res) => {
  const { boardId } = req.query;
  const response = await columnsTasksService.getColumnTasks(boardId);
  res.status(200).send(response);
}

const deleteTask = async (req, res) => {
  const { id } = req.query;
  const response = await columnsTasksService.deleteColumnTask(id);
  res.status(200).send(response);
}

const updateTask = async (req, res) => {
  const { id, title, description } = req.body;
  const error = taskValidate(title, description);

  if(!isEmpty(error)) {
    throw new errors.ValidationError(error.title);
  }
  
  const response = await columnsTasksService.updateColumnTask(id, title, description);
  res.status(200).send(response);
}

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
}
