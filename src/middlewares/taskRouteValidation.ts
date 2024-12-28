import { body } from 'express-validator';

export const createTaskValidation = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio.')
    .isString().withMessage('El título debe ser un texto'),
  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser un texto'),
  body('completed')
    .optional()
    .isBoolean().withMessage('El estado debe ser un valor booleano'),
];

export const updateTaskValidation = [
  body('title')
    .optional()
    .isString().withMessage('El título debe ser un texto'),
  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser un texto'),
  body('completed')
    .optional()
    .isBoolean().withMessage('El estado debe ser un valor booleano'),
];
