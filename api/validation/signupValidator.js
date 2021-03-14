const Joi = require('joi');

const usernameSchema = Joi.string()
  .min(3)
  .max(20)
  .required();

const emailSchema = Joi.string()
  .email()
  .max(64)
  .required();

const passwordSchema = Joi.string()
  .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
  .min(6)
  .max(42)
  .required();

const signupValidate = (username, email, password) => {

  let errors = {};

  try {
    Joi.attempt(username, usernameSchema);
  }
  catch (error) {
    errors.username = error.message.replace('"value"', 'Username');
  }

  try {
    Joi.attempt(email, emailSchema);
  }
  catch (error) {
    errors.email = error.message.replace('"value"', 'Email');
  }

  try {
    Joi.attempt(password, passwordSchema);
  }
  catch (error) {
    errors.password = 'Password must be at least 6 characters long and have at least one uppercase letter.';
  }

  return errors;
}

const signinValidate = (email) => {

  let errors = {};

  try {
    Joi.attempt(email, emailSchema);
  }
  catch (error) {
    errors.email = error.message.replace('"value"', 'Email');
  }

  // try {
  //   Joi.attempt(password, passwordSchema);
  // }
  // catch (error) {
  //   errors.password = error.message.replace('"value"', 'Password');
  // }

  return errors;
}

module.exports = {
  signupValidate,
  signinValidate,
}
