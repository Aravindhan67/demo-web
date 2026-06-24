import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', protect, changePassword);
router.get('/profile', protect, getProfile);

export default router;
