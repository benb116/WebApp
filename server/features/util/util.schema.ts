// Common validators for object properties

import Joi from 'joi';

const passwordMinLength = 8;

const validators = {
  email: Joi.string().email().required().messages({
    'string.base': 'Email is invalid',
    'string.email': 'Email is invalid',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(passwordMinLength).required().messages({
    'string.base': 'Password is invalid',
    'string.min': `Password must be at least ${passwordMinLength} characters long`,
    'any.required': 'Password is required',
  }),

  user: Joi.number().integer().greater(0).required()
    .messages({
      'number.base': 'User ID is invalid',
      'number.integer': 'User ID is invalid',
      'number.greater': 'User ID is invalid',
      'any.required': 'You must be logged in',
    }),

  noObj: Joi.object().length(0),
};

export default validators;
