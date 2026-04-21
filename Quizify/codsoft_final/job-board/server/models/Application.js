/**
 * Application Model
 * Stores job applications from candidates
 */

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    // Applicant and Job Reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },

    // Resume Upload
    resume: {
      filename: String,
      filepath: String,
      uploadedAt: Date,
    },

    // Cover Letter
    coverLetter: String,

    // Application Status
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },

    // Notes
    notes: String,
  },
  { timestamps: true }
);

/**
 * Compound index to prevent duplicate applications
 */
applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
