const db = require('../models');
const { hashHelpers, jwtHelpers } = require('../helpers');
const errors = require('./errorHandlers/index');

const signUp = async ({ username, email, password }) => {

  const userExists = await db.users.findOne({ where: { email: email } });

  if (userExists) {
    throw new errors.UserAlreadyExistsError();
  }

  const hashedPassword = await hashHelpers.createHash(password);
  const transaction = await db.sequelize.transaction();

  const user = {
    username: username,
    email: email,
    password: hashedPassword,
  }

  try {
    const newUser = await db.users.create(user, { transaction });
    const token = jwtHelpers.generateToken({ id: newUser.dataValues.id, email, username });
    await transaction.commit();
    return token;
  }
  catch (error) {
    transaction.rollback();
    throw new errors.SignupFailedError();
  }
}

const signIn = async ({ email, password }) => {
  const user = await db.users.findOne({ where: { email: email } });

  if (!user) {
    throw new errors.NotFoundError('User not found!');
  }

  const checkedPassword = await hashHelpers.validPassword(password, user.password);

  if (password && !checkedPassword) {
    throw new errors.WrongPasswordError();
  }

  return jwtHelpers.generateToken({ id: user.id, email, username: user.username });
}

module.exports = {
  signUp,
  signIn,
}
