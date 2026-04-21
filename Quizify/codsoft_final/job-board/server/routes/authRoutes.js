/**
 * Authentication Routes
 * Handles user registration, login, and profile management
 */

const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('role', 'Role must be either employer or candidate').isIn(['employer', 'candidate']),
  ],
  register
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  '/login',
  [
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  login
);

/**
 * GET /api/auth/profile
 * Get current user profile (protected route)
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * PUT /api/auth/profile
 * Update user profile (protected route)
 */
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
