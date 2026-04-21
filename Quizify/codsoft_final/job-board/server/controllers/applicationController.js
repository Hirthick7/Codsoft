/**
 * Application Controller
 * Handles job applications, resume uploads, and application management
 */

const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const { sendEmail } = require('../config/emailConfig');
const fs = require('fs');
const path = require('path');

/**
 * Apply for Job (Candidate only)
 * POST /api/apply
 */
const applyForJob = async (req, res, next) => {
  try {
    const { jobId, coverLetter } = req.body;

    // Validate job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      userId: req.user.userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Prepare resume info
    let resume = null;
    if (req.file) {
      resume = {
        filename: req.file.filename,
        filepath: req.file.path,
        uploadedAt: new Date(),
      };
    }

    // Create application
    const application = new Application({
      userId: req.user.userId,
      jobId,
      coverLetter,
      resume,
    });

    await application.save();

    // Get user and job info for email
    const user = await User.findById(req.user.userId);
    const populatedJob = await Job.findById(jobId).populate('createdBy');

    // Send confirmation email to candidate
    const candidateEmailHtml = `
      <h2>Application Submitted!</h2>
      <p>Hi ${user.name},</p>
      <p>Thank you for applying for the <strong>${job.title}</strong> position at <strong>${job.company}</strong>.</p>
      <p>We have received your application and will review it shortly. You will be notified once the employer reviews your application.</p>
      <p>Best regards,<br/>Job Board Team</p>
    `;

    // Send notification email to employer
    const employer = populatedJob.createdBy;
    const employerEmailHtml = `
      <h2>New Application Received!</h2>
      <p>Hi ${employer.name},</p>
      <p>You have received a new application for the <strong>${job.title}</strong> position from <strong>${user.name}</strong>.</p>
      <p>Applicant Email: ${user.email}</p>
      <p>Please log in to your dashboard to review the application.</p>
      <p>Best regards,<br/>Job Board Team</p>
    `;

    // Send emails (non-blocking)
    sendEmail(
      user.email,
      'Application Submitted - Job Board',
      `Your application for ${job.title} has been submitted`,
      candidateEmailHtml
    );

    sendEmail(
      employer.email,
      'New Application Received - Job Board',
      `New application received for ${job.title}`,
      employerEmailHtml
    );

    res.status(201).json({
      message: 'Application submitted successfully. Confirmation email sent!',
      application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Applications for Candidate
 * GET /api/applications/user
 */
const getCandidateApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ userId: req.user.userId })
      .populate('jobId', 'title company location salary')
      .sort({ createdAt: -1 });

    res.json({
      applications,
      total: applications.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Applications for Employer
 * GET /api/applications/employer
 */
const getEmployerApplications = async (req, res, next) => {
  try {
    // Get all jobs created by employer
    const jobs = await Job.find({ createdBy: req.user.userId });
    const jobIds = jobs.map(job => job._id);

    // Get applications for those jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('userId', 'name email phone skills')
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 });

    res.json({
      applications,
      total: applications.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Application Details
 * GET /api/applications/:id
 */
const getApplicationDetails = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('userId', 'name email phone skills location title')
      .populate('jobId', 'title company location');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check authorization
    const job = await Job.findById(application.jobId);
    if (job.createdBy.toString() !== req.user.userId && application.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }

    res.json({ application });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Application Status (Employer only)
 * PUT /api/applications/:id/status
 */
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    ).populate('userId jobId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Send status update email to candidate
    const emailHtml = `
      <h2>Application Status Update</h2>
      <p>Hi ${application.userId.name},</p>
      <p>Your application for <strong>${application.jobId.title}</strong> has been updated.</p>
      <p>New Status: <strong>${status.toUpperCase()}</strong></p>
      ${notes ? `<p>Notes from employer: ${notes}</p>` : ''}
      <p>Best regards,<br/>Job Board Team</p>
    `;

    sendEmail(
      application.userId.email,
      'Application Status Update - Job Board',
      `Your application status has been updated to ${status}`,
      emailHtml
    );

    res.json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Download Resume
 * GET /api/applications/:id/resume
 */
const downloadResume = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application || !application.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const filePath = application.resume.filepath;

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Resume file not found' });
    }

    res.download(filePath);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyForJob,
  getCandidateApplications,
  getEmployerApplications,
  getApplicationDetails,
  updateApplicationStatus,
  downloadResume,
};
