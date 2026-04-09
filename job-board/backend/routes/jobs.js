const express = require('express');
const {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getApplicantsForJob,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', listJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('employer'), createJob);
router.put('/:id', protect, authorize('employer'), updateJob);
router.delete('/:id', protect, authorize('employer'), deleteJob);
router.get('/:jobId/applicants', protect, authorize('employer'), getApplicantsForJob);

module.exports = router;
