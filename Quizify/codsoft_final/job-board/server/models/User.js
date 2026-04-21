/**
 * User Model
 * Stores user information (both employers and candidates)
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    
    // Role-based Information
    role: {
      type: String,
      enum: ['employer', 'candidate'],
      required: [true, 'Please specify a role'],
    },

    // Employer-specific fields
    company: {
      type: String,
      required: function() {
        return this.role === 'employer';
      },
    },
    companyEmail: {
      type: String,
    },
    companyPhone: {
      type: String,
    },

    // Candidate-specific fields
    title: {
      type: String,
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    skills: [String],
    experience: {
      type: String,
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Hash password before saving
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare password method
 * @param {string} enteredPassword - Password to compare
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
