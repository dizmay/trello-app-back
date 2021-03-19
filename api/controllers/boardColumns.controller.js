const { boardColumnsService } = require("../services");

const createColumn = async (req, res) => {
  const { title, boardId } = req.body;
  const response = await boardColumnsService.createNewColumn(title, boardId);
  res.status(200).send(response);
}

const getBoardColumns = async (req, res) => {
  const { boardId } = req.body;
  const response = await boardColumnsService.getColumns(boardId);
  res.status(200).send(response);
}

const deleteColumn = async (req, res) => {
  const { columnId } = req.body;
  const response = await boardColumnsService.deleteBoardColumn(columnId);
  res.status(200).send(response);
}

const updateColumn = async (req, res) => {
  const { columnId, title } = req.body;
  const response = await boardColumnsService.updateBoardColumn(columnId, title);
  res.status(200).send(response);
}

module.exports = {
  createColumn,
  getBoardColumns,
  deleteColumn,
  updateColumn,
}