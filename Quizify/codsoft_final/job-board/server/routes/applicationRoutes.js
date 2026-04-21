/**
 * Application Routes
 * Handles job applications and resume uploads
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  applyForJob,
  getCandidateApplications,
  getEmployerApplications,
  getApplicationDetails,
  updateApplicationStatus,
  downloadResume,
} = require('../controllers/applicationController');
const { authMiddleware, isCandidate, isEmployer } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * Configure multer for resume uploads
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allow only PDF and DOC files
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

/**
 * POST /api/apply
 * Apply for a job (candidate only)
 */
router.post('/', authMiddleware, isCandidate, upload.single('resume'), applyForJob);

/**
 * GET /api/applications/user
 * Get applications for candidate
 */
router.get('/user', authMiddleware, isCandidate, getCandidateApplications);

/**
 * GET /api/applications/employer
 * Get applications for employer's jobs
 */
router.get('/employer', authMiddleware, isEmployer, getEmployerApplications);

/**
 * GET /api/applications/:id
 * Get application details
 */
router.get('/:id', authMiddleware, getApplicationDetails);

/**
 * PUT /api/applications/:id/status
 * Update application status (employer only)
 */
router.put('/:id/status', authMiddleware, isEmployer, updateApplicationStatus);

/**
 * GET /api/applications/:id/resume
 * Download resume
 */
router.get('/:id/resume', authMiddleware, downloadResume);

module.exports = router;
