const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');
const sampleData = require('./data/sampleData');

dotenv.config();

const importData = async (exitAfter = true) => {
  try {
    await connectDB();
    await Application.deleteMany();
    await Job.deleteMany();
    await User.deleteMany();

    const users = await Promise.all(
      sampleData.users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({ ...user, password: hashedPassword });
      })
    );

    const employer = users.find((user) => user.role === 'employer');
    const candidateUsers = users.filter((user) => user.role === 'candidate');

    const jobs = await Promise.all(
      sampleData.jobs.map((job) => Job.create({ ...job, createdBy: employer._id }))
    );

    await Promise.all(
      sampleData.applications.map(async (application) => {
        const user = candidateUsers.find((candidate) => candidate.email === application.userEmail);
        const job = jobs.find((jobItem) => jobItem.title === application.jobTitle);
        if (user && job) {
          await Application.create({
            userId: user._id,
            jobId: job._id,
            resume: application.resume,
            status: application.status,
          });
        }
      })
    );

    console.log('Sample data imported successfully.');
    if (exitAfter) process.exit();
  } catch (error) {
    console.error('Error importing sample data:', error);
    if (exitAfter) process.exit(1);
    else throw error;
  }
};

if (require.main === module) {
  importData(true);
}

module.exports = importData;
