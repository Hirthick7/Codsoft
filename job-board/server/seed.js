/**
 * Database Seed Script
 * Populates MongoDB with sample job data
 * 
 * Run with: npm run seed
 * Make sure MongoDB is running and server is configured
 */

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();
const Job = require('./models/Job');
const User = require('./models/User');
const sampleJobs = require('./seeds/jobs');

/**
 * Seed the database
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 Connected to MongoDB');

    // Find or create a default employer
    let employer = await User.findOne({ role: 'employer', email: 'admin@jobboard.com' });
    
    if (!employer) {
      console.log('👤 Creating default employer user...');
      const hashedPassword = await bcryptjs.hash('Admin@123', 10);
      
      employer = new User({
        name: 'Job Board Admin',
        email: 'admin@jobboard.com',
        password: hashedPassword,
        role: 'employer',
        company: 'Multiple Companies',
      });
      
      await employer.save();
      console.log('✅ Default employer created (Email: admin@jobboard.com, Password: Admin@123)');
    } else {
      console.log('✅ Using existing employer account');
    }

    // Add createdBy to all jobs
    const jobsWithEmployer = sampleJobs.map(job => ({
      ...job,
      createdBy: employer._id,
    }));

    // Check if jobs already exist
    const existingJobs = await Job.countDocuments();
    
    if (existingJobs > 0) {
      console.log(`\n⚠️  Database already contains ${existingJobs} jobs`);
      
      // Check for duplicate job titles
      const sampleTitles = sampleJobs.map(j => j.title);
      const existingTitles = await Job.distinct('title');
      
      const newJobs = jobsWithEmployer.filter(job => !existingTitles.includes(job.title));
      
      if (newJobs.length === 0) {
        console.log('✅ All sample jobs already exist in database\n');
        process.exit(0);
      }
      
      console.log(`Found ${newJobs.length} new jobs to add...\n`);
      const inserted = await Job.insertMany(newJobs);
      console.log(`✅ Added ${inserted.length} new job(s) to database`);
    } else {
      // Insert all sample jobs
      const inserted = await Job.insertMany(jobsWithEmployer);
      console.log(`\n✨ Successfully seeded database with ${inserted.length} sample jobs!\n`);
    }

    // Display inserted jobs
    const allJobs = await Job.find().select('title company salary');
    console.log('📋 Current jobs in database:');
    console.log('─'.repeat(70));
    allJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title}`);
      console.log(`   ${job.company} | ${job.salary}`);
    });
    console.log('─'.repeat(70));
    console.log(`\nTotal jobs: ${allJobs.length}\n`);

    console.log('🚀 Sample job data loaded successfully!');
    console.log('You can now test the job board application:\n');
    console.log('1. Visit http://localhost:3000 in your browser');
    console.log('2. Click "Browse Jobs" to see all sample jobs');
    console.log('3. Search and filter through the jobs');
    console.log('4. Register as a candidate and apply for jobs\n');
    console.log('📝 Employer Account for Testing:');
    console.log('   Email: admin@jobboard.com');
    console.log('   Password: Admin@123\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    // Disconnect from database
    await mongoose.disconnect();
    console.log('💤 Database connection closed\n');
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--clear')) {
  // Clear database before seeding
  mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('📡 Connected to MongoDB');
      console.log('🗑️  Clearing existing jobs and sample users...\n');
      
      const jobResult = await Job.deleteMany({});
      const userResult = await User.deleteMany({ email: 'admin@jobboard.com' });
      
      console.log(`✅ Deleted ${jobResult.deletedCount} job(s)`);
      console.log(`✅ Deleted ${userResult.deletedCount} user(s)`);
      await mongoose.disconnect();
      console.log('\nReady to seed new data. Run: npm run seed\n');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
} else {
  // Run seed
  seedDatabase();
}

