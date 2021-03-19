const Joi = require('joi');

const columnSchema = Joi.string()
  .min(3)
  .max(20)
  .required();

const columnTitleValidate = (title) => {
  
  let errors = {};

  try {
    Joi.attempt(title, columnSchema);
  }
  catch (error) {
    errors.title = error.message.replace('"value"', 'Title');
  }

  return errors;
}

module.exports = {
  columnTitleValidate,
}