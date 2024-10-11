import { body, param } from 'express-validator';

export const validateUser = [
  body('first_name').isString().withMessage('First name must be a string'),
  body('last_name').isString().withMessage('Last name must be a string'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('city').optional().isString().withMessage('City must be a string'),
  body('gender').optional().isString().withMessage('Gender must be a string'),
  body('language').optional().isString().withMessage('Language must be a string'),
];

export const validateUserId = [
  param('id').isString().withMessage('ID must be a string'),
];