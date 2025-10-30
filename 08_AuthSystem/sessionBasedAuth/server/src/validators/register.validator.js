import { body, validationResult } from 'express-validator';

export const registerValidator = [
  body('fullName')
    .not()
    .trim()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be at least 3 characters long'),

  body('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),

  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be at least 6 characters long'),

  body('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array().map((error) => error.msg).join(",");
    return res.status(400).json({ errors: error});
  }
  next();
};
