/**
 * Job Routes
 * Handles job creation, retrieval, search, and management
 */

const express = require('express');
const {
  getAllJobs,
  getLatestJobs,
  searchJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getEmployerJobs,
} = require('../controllers/jobController');
const { authMiddleware, isEmployer } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * GET /api/jobs
 * Get all jobs (public route)
 */
router.get('/', getAllJobs);

/**
 * GET /api/jobs/latest
 * Get latest 5 jobs (public route)
 */
router.get('/latest', getLatestJobs);

/**
 * GET /api/jobs/search?q=keyword
 * Search jobs (public route)
 */
router.get('/search', searchJobs);

/**
 * GET /api/jobs/:id
 * Get job by ID (public route)
 */
router.get('/:id', getJobById);

/**
 * POST /api/jobs
 * Create new job (employer only)
 */
router.post('/', authMiddleware, isEmployer, createJob);

/**
 * PUT /api/jobs/:id
 * Update job (employer only)
 */
router.put('/:id', authMiddleware, isEmployer, updateJob);

/**
 * DELETE /api/jobs/:id
 * Delete job (employer only)
 */
router.delete('/:id', authMiddleware, isEmployer, deleteJob);

/**
 * GET /api/jobs/employer/my-jobs
 * Get jobs posted by employer
 */
router.get('/employer/my-jobs', authMiddleware, isEmployer, getEmployerJobs);

module.exports = router;
