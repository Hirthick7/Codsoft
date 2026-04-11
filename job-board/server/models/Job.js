/**
 * Job Model
 * Stores job listings posted by employers
 */

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    // Job Information
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    salary: {
      type: String,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      required: [true, 'Please specify job type'],
    },
    experience: {
      type: String,
      enum: ['Entry-level', 'Mid-level', 'Senior', 'Executive'],
    },
    skills: [String],
    
    // Job Poster (Employer)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Index for search functionality
 */
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

module.exports = mongoose.model('Job', jobSchema);
