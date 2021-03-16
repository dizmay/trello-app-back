const Joi = require('joi');

const titleSchema = Joi.string()
  .min(3)
  .max(20)
  .required();

const boardTitleValidate = (title) => {
  
  let errors = {};

  try {
    Joi.attempt(title, titleSchema);
  }
  catch (error) {
    errors.title = error.message.replace('"value"', 'Title');
  }

  return errors;
}

module.exports = {
  boardTitleValidate,
}