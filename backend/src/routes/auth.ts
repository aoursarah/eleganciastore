import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', login);

/**
 * GET /api/auth/me
 * Get current user profile (Protected)
 */
router.get('/me', verifyToken, getProfile);

/**
 * PUT /api/auth/profile
 * Update user profile (Protected)
 */
router.put('/profile', verifyToken, updateProfile);

export default router;
