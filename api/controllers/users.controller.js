const { authService } = require('../services');

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const response = await authService.signUp(req.body);
  res.status(200).send(response);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const response = await authService.signIn(req.body);
  res.status(200).send(response);
};

module.exports = {
  signUp,
  signIn,
}
