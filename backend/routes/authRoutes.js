import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import protect from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('username')
  .trim()
  .isLength({ min: 3})
  .withMessage('Username must be at least 3 characters'),
  body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email'),
  body('password')
  .isLength({min:6})
  .withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email'),
  body('password')
  .isLength({min:6})
  .withMessage('Password is required')
];

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/change-password', protect, changePassword);

export default router;