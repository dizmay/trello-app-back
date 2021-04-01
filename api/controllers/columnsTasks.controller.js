const { objIsEmpty } = require('../utils')
const { columnsTasksService } = require('../services');
const { taskValidate } = require('../validation/columnsTasksValidator');
const errors = require('../services/errorHandlers');

const createTask = async (req, res) => {
  const { title, description, columnId, boardId } = req.body;
  const error = taskValidate(title, description);

  if(!objIsEmpty(error)) {
    throw new errors.ValidationError(error.title);
  }

  const response = await columnsTasksService.createColumnTask(title, description, columnId, boardId);
  res.status(200).send(response);
}

const deleteTask = async (req, res) => {
  const { id, columnId } = req.query;
  const response = await columnsTasksService.deleteColumnTask(id, columnId);
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

const moveCard = async (req, res) => {
  const { dragId, dropId, dragColumnId, dropColumnId, side } = req.body;
  const response = await columnsTasksService.moveColumnTask(dragId, dropId, dragColumnId, dropColumnId, side)
  res.status(200).send(response);
}

module.exports = {
  createTask,
  deleteTask,
  updateTask,
  moveCard,
}
