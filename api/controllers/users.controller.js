const { authService } = require('../services');
const { signupValidate, signinValidate } = require('../validation/signupValidator');
const { objIsEmpty } = require('../utils');

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = signupValidate(username, email, password);

  if (!objIsEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await authService.signUp(req.body);
  res.status(200).send(response);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const errors = signinValidate(email);

  if (!objIsEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await authService.signIn(req.body);
  res.status(200).send(response);
};

module.exports = {
  signUp,
  signIn,
}
