# Sample Job Data Seeding Guide

This guide explains how to populate the Job Board database with realistic sample job data.

## 🎯 What's Included

The seed file contains **10 realistic job postings** with:
- ✅ Detailed job descriptions
- ✅ Required and optional skills
- ✅ Salary ranges
- ✅ Real company names
- ✅ Various locations and job types
- ✅ Experience level requirements
- ✅ Company benefits and perks

### Sample Jobs

1. **Senior Full Stack Developer** - TechVision Inc., San Francisco, CA ($150k-$200k)
2. **Product Manager** - Innovation Labs, New York, NY ($120k-$160k)
3. **UI/UX Designer** - Creative Digital Studio, Los Angeles, CA ($90k-$130k)
4. **DevOps Engineer** - CloudScale Solutions, Seattle, WA ($130k-$170k)
5. **Junior Frontend Developer** - StartupXYZ, Austin, TX ($70k-$95k)
6. **Data Scientist** - Analytics Pro, Boston, MA ($110k-$150k)
7. **Backend Engineer (Java)** - Enterprise Systems Corp, Chicago, IL ($125k-$165k)
8. **QA Automation Engineer** - Quality First Testing, Denver, CO ($85k-$120k)
9. **Cloud Architect** - FutureCloud Tech, Remote ($160k-$220k)
10. **Technical Writer** - DocFlow Solutions, Portland, OR ($70k-$100k)

---

## 📋 Prerequisites

- Node.js and npm installed
- MongoDB connection configured in `.env`
- Backend server running or accessible

---

## 🚀 How to Use

### Option 1: Add Sample Jobs (Recommended)

Run this command to add sample jobs to your database (won't delete existing data):

```bash
cd server
npm run seed
```

**Output:**
```
📡 Connected to MongoDB
✨ Successfully seeded database with 10 sample jobs!

📋 Current jobs in database:
─────────────────────────────────────────────────────────
1. Senior Full Stack Developer
   TechVision Inc. | $150k - $200k
2. Product Manager
   Innovation Labs | $120k - $160k
...
Total jobs: 10
```

### Option 2: Clear and Reseed Database

If you want to remove all jobs and start fresh:

```bash
cd server
npm run seed:clear
```

Then seed the database:

```bash
npm run seed
```

---

## ✨ What You Can Do After Seeding

Once the database is populated with sample jobs:

### 1. **Browse Jobs**
   - Visit http://localhost:3000
   - Click "Browse Jobs"
   - See all 10 sample job listings

### 2. **Search & Filter**
   - Search by job title (e.g., "Developer", "Designer")
   - Filter by salary range
   - Filter by location
   - Filter by job type

### 3. **Test Features**
   - Register as a candidate
   - Apply for jobs
   - Upload resumes
   - Receive confirmation emails

### 4. **Employer Features**
   - Register as an employer
   - View job applicants
   - Update application status
   - Download candidate resumes

### 5. **Experience the Full Workflow**
   - Post new jobs
   - Manage applications
   - Test email notifications

---

## 📝 Sample Data Details

Each job includes:

```javascript
{
  title: "Job Title",
  company: "Company Name",
  location: "City, State",
  salary: {
    min: 100000,
    max: 150000,
    currency: "USD"
  },
  jobType: "Full-time",     // Full-time, Remote, Part-time, Contract
  experience: "5+ years",    // Experience requirement
  description: "Detailed job description with responsibilities and requirements",
  skills: ["Skill1", "Skill2", ...],
  requiredSkills: ["Required1", "Required2"],
  optionalSkills: ["Optional1", "Optional2"],
  postedDate: Date,          // When job was posted
  deadline: Date,            // Application deadline
  isActive: true             // Is job currently active
}
```

---

## 🛠 Customizing Sample Data

To modify the sample jobs:

1. **Edit seed file:**
   ```bash
   vim server/seeds/jobs.js
   ```

2. **Add new jobs:**
   - Add objects to the `sampleJobs` array
   - Follow the same structure as existing jobs

3. **Re-run seed:**
   ```bash
   npm run seed:clear
   npm run seed
   ```

---

## 🔍 Viewing Jobs in MongoDB

To view jobs in MongoDB directly:

```bash
# Using MongoDB Compass or CLI
db.jobs.find()

# To see formatted data
db.jobs.find().pretty()

# Count total jobs
db.jobs.countDocuments()
```

---

## ⚙️ Seed Configuration

### Files Involved

- **`server/seed.js`** - Main seed script
- **`server/seeds/jobs.js`** - Sample job data
- **`server/package.json`** - NPM scripts

### Commands

| Command | Purpose |
|---------|---------|
| `npm run seed` | Add sample jobs to database |
| `npm run seed:clear` | Remove all jobs from database |
| `npm run dev` | Start backend server |

---

## 🎓 Testing Workflow

Here's a complete testing workflow using the sample data:

1. **Start Backend**
   ```bash
   npm run dev
   ```

2. **Seed Database**
   ```bash
   npm run seed
   ```

3. **Start Frontend**
   ```bash
   cd ../client
   npm start
   ```

4. **Test in Browser**
   - Open http://localhost:3000
   - Browse the 10 sample jobs
   - Register and apply for jobs
   - Check all features

---

## 🐛 Troubleshooting

### "MongoDB Connection Error"
- Verify `.env` has correct `MONGODB_URI`
- Check MongoDB is running (Atlas or local)
- Check network connectivity

### "Jobs not appearing"
- Verify seed completed successfully
- Check backend logs
- Refresh browser (clear cache if needed)
- Query MongoDB directly to confirm data

### "Seed script not found"
- Ensure you're in the `server` directory
- Run `npm install` first
- Check `.env` exists and is configured

### "E/O Error"
- Check file permissions
- Ensure `seeds` directory exists
- Try run with `node seed.js` directly

---

## 📚 Next Steps

After seeding:

- ✅ Test the full job board workflow
- ✅ Verify all search and filter features work
- ✅ Test authentication and role-based access
- ✅ Review email notification system
- ✅ Check responsive design on different devices
- ✅ Plan production deployment

---

## 💡 Tips

- **First Time?** Run `npm run seed` to add sample data
- **Testing Features?** Use sample jobs for demonstrations
- **Demo Ready?** Seed database before showing to stakeholders
- **Development?** Keep sample data for reference

---

## 📞 Need Help?

See the main [README.md](../README.md) or [Backend README](./README.md) for more information.
