const Job = require('../models/Job');
const Application = require('../models/Application');

exports.listJobs = async (req, res, next) => {
  try {
    const { search, location } = req.query;
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json(job);
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, salary } = req.body;
    const job = await Job.create({ title, description, company, location, salary, createdBy: req.user.id });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized.' });
    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized.' });
    await job.remove();
    res.json({ message: 'Job removed.' });
  } catch (error) {
    next(error);
  }
};

exports.getApplicantsForJob = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).populate('userId', 'name email');
    res.json(applications);
  } catch (error) {
    next(error);
  }
};
