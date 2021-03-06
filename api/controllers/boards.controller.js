const { objIsEmpty } = require('../utils')
const { boardService } = require('../services');
const { boardTitleValidate } = require('../validation/boardValidator');

const createBoard = async (req, res) => {
  const { title } = req.body;
  const errors = boardTitleValidate(title);

  if (!objIsEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await boardService.createBoard(req.body);
  res.status(200).send(response);
}

const getBoards = async (req, res) => {
  const response = await boardService.getUserBoards(req.headers);
  res.status(200).send(response);
}

const deleteBoard = async (req, res) => {
  const { id } = req.query;
  const response = await boardService.deleteUserBoard(id);
  res.status(200).send(response);
}

module.exports = {
  createBoard,
  getBoards,
  deleteBoard,
}
