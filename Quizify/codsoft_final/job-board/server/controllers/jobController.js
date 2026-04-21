/**
 * Job Controller
 * Handles job creation, retrieval, search, and management
 */

const Job = require('../models/Job');
const User = require('../models/User');

/**
 * Get All Jobs
 * GET /api/jobs
 */
const getAllJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const jobs = await Job.find({ isActive: true })
      .populate('createdBy', 'name company email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments({ isActive: true });

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Latest 5 Jobs (for homepage)
 * GET /api/jobs/latest
 */
const getLatestJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate('createdBy', 'name company email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ jobs });
  } catch (error) {
    next(error);
  }
};

/**
 * Search Jobs
 * GET /api/jobs/search?q=keyword
 */
const searchJobs = async (req, res, next) => {
  try {
    const { q, location, jobType } = req.query;

    let searchQuery = { isActive: true };

    if (q) {
      searchQuery.$text = { $search: q };
    }

    if (location) {
      searchQuery.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
      searchQuery.jobType = jobType;
    }

    const jobs = await Job.find(searchQuery)
      .populate('createdBy', 'name company email')
      .sort({ createdAt: -1 });

    res.json({
      jobs,
      total: jobs.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Job by ID
 * GET /api/jobs/:id
 */
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('createdBy', 'name company email companyPhone');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ job });
  } catch (error) {
    next(error);
  }
};

/**
 * Create Job (Employer only)
 * POST /api/jobs
 */
const createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, salary, jobType, experience, skills } = req.body;

    // Validate required fields
    if (!title || !description || !company || !location || !jobType) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experience,
      skills: skills ? skills.split(',').map(s => s.trim()) : [],
      createdBy: req.user.userId,
    });

    await job.save();

    res.status(201).json({
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Job (Employer only)
 * PUT /api/jobs/:id
 */
const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job creator
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const { title, description, company, location, salary, jobType, experience, skills } = req.body;

    job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experience,
        skills: skills ? skills.split(',').map(s => s.trim()) : job.skills,
      },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Job updated successfully',
      job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Job (Employer only)
 * DELETE /api/jobs/:id
 */
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job creator
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Jobs Posted by Employer
 * GET /api/jobs/employer/my-jobs
 */
const getEmployerJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({
      jobs,
      total: jobs.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getLatestJobs,
  searchJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getEmployerJobs,
};
