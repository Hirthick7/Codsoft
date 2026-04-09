const Application = require('../models/Application');
const Job = require('../models/Job');
const sendEmail = require('../utils/email');

exports.applyToJob = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    if (!jobId || !req.file) {
      return res.status(400).json({ message: 'Job ID and resume are required.' });
    }
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    const existing = await Application.findOne({ userId: req.user.id, jobId });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied to this job.' });
    }
    const application = await Application.create({
      userId: req.user.id,
      jobId,
      resume: req.file.filename,
    });
    await sendEmail({
      to: req.user.email,
      subject: 'Application Received',
      text: `Your application for ${job.title} at ${job.company} has been received.`,
    });
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

exports.getUserApplications = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (req.user.id !== userId && req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
    const applications = await Application.find({ userId }).populate('jobId');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

exports.getJobApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).populate('userId', 'name email');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};
