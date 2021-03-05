const Joi = require('joi');

const usernameSchema = Joi.string()
  .min(3)
  .max(20)
  .required();

const emailSchema = Joi.string()
  .email()
  .max(64)
  .required;

const passwordSchema = Joi.string()
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/)
  .min(6)
  .max(42)
  .required();

const schema = Joi.object().keys({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
})

const signupValidate = (username, email, password) => {
  const usernameValidate = schema.validate({ username, email, password })
}
