const Joi = require('joi');

const titleSchema = Joi.string()
  .min(3)
  .max(20)
  .required();

const descriptionSchema = Joi.string()
  .min(1)
  .max(120)
  .required();

const taskValidate = (title, description) => {
  
  let errors = {};

  try {
    Joi.attempt(title, titleSchema);
  }
  catch (error) {
    errors.title = error.message.replace('"value"', 'Title');
  }

  try {
    Joi.attempt(description, descriptionSchema);
  }
  catch (error) {
    errors.title = error.message.replace('"value"', 'Description');
  }

  return errors;
}

module.exports = {
  taskValidate,
}