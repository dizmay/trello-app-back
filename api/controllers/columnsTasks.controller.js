const { objIsEmpty } = require('../utils')
const { columnsTasksService } = require('../services');
const { taskValidate } = require('../validation/columnsTasksValidator');
const errors = require('../services/errorHandlers');

const createTask = async (req, res) => {
  const { title, description, columnId } = req.body;
  const error = taskValidate(title, description);

  if(!objIsEmpty(error)) {
    throw new errors.ValidationError(error.title);
  }

  const response = await columnsTasksService.createColumnTask(title, description, columnId);
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

  if(!objIsEmpty(error)) {
    throw new errors.ValidationError(error.title);
  }
  
  const response = await columnsTasksService.updateColumnTask(id, title, description);
  res.status(200).send(response);
}

module.exports = {
  createTask,
  deleteTask,
  updateTask,
}
