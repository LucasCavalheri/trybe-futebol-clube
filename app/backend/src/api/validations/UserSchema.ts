import * as joi from 'joi';

const userSchema = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
    'string.base': '"email" must be a string',
    'string.email': 'Invalid email or password',
  }),
  password: joi.string().min(6).required().messages({
    'any.required': 'All fields must be filled',
    'string.base': '"password" must be a string',
    'string.min': 'Invalid email or password',
  }),
});

export default userSchema;
