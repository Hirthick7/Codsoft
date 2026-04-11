# Complete Setup Guide - Job Board Web Application

Follow these steps to get the full-stack Job Board application running on your local machine.

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas** account - [Create Free](https://www.mongodb.com/cloud/atlas)
- **Gmail account** (for email notifications)
- **Git** (optional, for version control)
- **Code Editor** (VS Code recommended)

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or login to your account
3. Create a new project called "Job Board"
4. Create a cluster (choose free tier)
5. Wait for cluster to be created (5-10 minutes)
6. Click "Connect" → "Connect your application"
7. Choose "Node.js" and copy the connection string
8. Replace `<username>`, `<password>`, and `<dbname>` in the URI
9. Keep this URI handy for later

## Step 2: Setup Gmail for Email Notifications

1. Open [Google Account Settings](https://myaccount.google.com/)
2. Go to Security → App passwords
3. Select "Mail" and "Windows Computer"
4. Google will generate a 16-character password
5. Copy this password (you'll use it in .env)

Alternative: Enable "Less secure app access" if 2FA is not enabled

## Step 3: Clone/Download the Project

```bash
# Using Git
git clone <repository-url>
cd job-board

# Or simply navigate to your project folder
cd job-board
```

## Step 4: Setup Backend

### 4.1 Install Backend Dependencies

```bash
cd server
npm install
```

This installs all required packages from package.json

### 4.2 Create Environment File

```bash
# Copy the example file
cp .env.example .env

# Or manually create .env file with the following content:
```

### 4.3 Configure .env File

Edit `server/.env` and add your credentials:

```env
# MongoDB Connection (from Step 1)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard?retryWrites=true&w=majority

# JWT Secret (generate any random string, e.g., from https://www.random.org/)
JWT_SECRET=your_super_secret_jwt_key_12345_random_string_here

# Gmail Configuration (from Step 2)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4.4 Test Backend

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
MongoDB Connected: cluster.mongodb.net
```

Press `Ctrl+C` to stop. The backend is ready!

## Step 5: Setup Frontend

### 5.1 Open New Terminal/Command Prompt

In a new terminal window, navigate to the client folder:

```bash
cd client
npm install
```

### 5.2 Create Frontend Environment File

```bash
cp .env.example .env
```

Content of `.env` (usually no changes needed if backend is on localhost:5000):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5.3 Test Frontend

```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## Step 6: Complete Setup Verification

You should now have:

✅ **Backend running on** `http://localhost:5000`
- Test: Open `http://localhost:5000/api/health` in browser
- Should show: `{"message":"Server is running"}`

✅ **Frontend running on** `http://localhost:3000`
- Should show the Job Board homepage

✅ **MongoDB connected** (check server console)

✅ Both can communicate with each other

## Step 7: Test the Application

### Test User Registration

1. Go to `http://localhost:3000`
2. Click "Register"
3. Register as a **Candidate**:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: Job Seeker

4. You'll be logged in automatically and see the home page

### Test as Employer

1. Logout (click your name → Logout)
2. Register again as **Employer**:
   - Name: Jane Smith
   - Company: Tech Corp
   - Email: jane@techcorp.com
   - Password: password123
   - Role: Employer

3. Go to Dashboard → Post a new job

### Test Full Workflow

1. **Employer posts a job**:
   - Go to Dashboard → Post New Job
   - Fill in job details
   - Click "Post Job"

2. **Candidate applies**:
   - Logout and login as candidate
   - Go to Jobs page
   - Click on the job posted
   - Click "Apply Now"
   - Upload a resume (any PDF file)
   - Submit

3. **Check email**:
   - Check candidate's email for application confirmation
   - Check employer's email for new application notification

4. **Employer reviews**:
   - Logout and login as employer
   - Go to Dashboard
   - View applications
   - Update status

## Troubleshooting

### Issue: MongoDB Connection Failed

**Solution:**
- Verify MongoDB URI is correct
- Check username and password have no special characters (or URL encode them)
- Add your IP address to MongoDB Atlas whitelist
- Try `mongodb://` instead of `mongodb+srv://` if using local MongoDB

### Issue: Email Not Sending

**Solution:**
- Verify Gmail/email credentials are correct
- Check if 16-character app password is being used (not Gmail password)
- Try enabling "Less secure app access" in Gmail settings
- Check spam folder

### Issue: CORS Error in Console

**Solution:**
- Restart backend server
- Verify `FRONTEND_URL` in server `.env` is `http://localhost:3000`
- Clear browser cache

### Issue: Port Already in Use

**Solution:**
```bash
# Find process using port 5000 (Windows):
netstat -ano | findstr :5000

# Kill it:
taskkill /PID <PID> /F

# For Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue: Cannot See Resume Upload

**Solution:**
- Ensure backend `uploads` folder exists
- Check file permissions
- Try with PDF file
- Check network tab in DevTools for errors

### Issue: Login Not Working

**Solution:**
- Clear browser localStorage: DevTools → Application → Clear All
- Reload page
- Try registering a new account
- Check backend console for errors

## Common Commands

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start

# Build for production
cd client
npm run build

# Install a new package
npm install package-name

# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Project File Structure

After setup, your folder structure should look like:

```
job-board/
├── server/
│   ├── node_modules/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env              (DO NOT COMMIT)
│
├── client/
│   ├── node_modules/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env              (DO NOT COMMIT)
│
├── README.md
├── .gitignore
└── SETUP_GUIDE.md
```

## Next Steps - Deployment

### Before Deploying:

1. **Update Environment Variables**:
   - Change `NODE_ENV` to `production`
   - Update `FRONTEND_URL` to your production URL
   - Use production database connection

2. **Test Production Build**:
   ```bash
   cd client
   npm run build
   npm install -g serve
   serve -s build
   ```

3. **Deploy Backend**:
   - Push to GitHub
   - Deploy to Railway, Render, or Heroku

4. **Deploy Frontend**:
   - Push to GitHub
   - Deploy to Netlify or Vercel

5. **Update API URLs**:
   - Update `REACT_APP_API_URL` for production backend

## Additional Resources

- [Express.js Tutorial](https://expressjs.com/en/starter/basic-routing.html)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [React Official Tutorial](https://react.dev/learn)
- [Tailwind CSS Getting Started](https://tailwindcss.com/docs/installation)
- [JWT Tokens Explained](https://jwt.io/introduction)

## Security Reminders

⚠️ **IMPORTANT:**
- Never commit `.env` files to Git
- Never share your JWT_SECRET publicly
- Never commit node_modules
- Keep passwords secure
- Always use HTTPS in production
- Validate input on both frontend and backend

## Getting Help

If you encounter issues:

1. **Check Error Messages**:
   - Look at browser console (F12)
   - Look at server terminal output

2. **Read Documentation**:
   - Check individual README files in server/ and client/
   - Review comments in the code

3. **Verify Setup**:
   - Double-check all .env values
   - Ensure all ports are available
   - Verify database is connected

4. **Reset Everything**:
   ```bash
   # Remove all node_modules and reinstall
   rm -rf server/node_modules client/node_modules
   cd server && npm install
   cd ../client && npm install
   ```

## Success Checklist

- [ ] MongoDB cluster created and white-listed
- [ ] Gmail app password generated
- [ ] .env files created and configured
- [ ] `npm install` completed for both server and client
- [ ] Backend running without errors
- [ ] Frontend accessible at localhost:3000
- [ ] Can register and login
- [ ] Can post a job (as employer)
- [ ] Can apply for a job (as candidate)
- [ ] Received confirmation emails

Once all items are checked, you have a fully functional Job Board application! 🎉

---

**Happy coding! For questions or issues, refer to the detailed README files in both server/ and client/ directories.**
