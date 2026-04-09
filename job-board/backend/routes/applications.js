const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const multer = require('../middleware/uploadMiddleware');
const {
  applyToJob,
  getUserApplications,
  getJobApplications,
} = require('../controllers/applicationController');
const router = express.Router();

router.post('/', protect, authorize('candidate'), multer.single('resume'), applyToJob);
router.get('/user/:id', protect, getUserApplications);
router.get('/job/:jobId', protect, authorize('employer'), getJobApplications);

module.exports = router;
