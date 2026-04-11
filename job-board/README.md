# Job Board Web Application - MERN Stack

Complete full-stack Job Board application built with MongoDB, Express, React, and Node.js. This application allows employers to post job listings and candidates to search for, view, and apply for jobs with resume uploads and email notifications.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB
- Gmail account (for email notifications)

### Installation & Setup

1. **Backend Setup**

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your credentials:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
JWT_SECRET=your-super-secret-jwt-key-generate-a-random-one
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
FRONTEND_URL=http://localhost:3000
```

2. **Frontend Setup**

```bash
cd client
npm install
cp .env.example .env
```

3. **Start Backend**

```bash
cd server
npm run dev
```

Backend runs on: `http://localhost:5000`

4. **Start Frontend**

```bash
cd client
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 📋 Project Structure

```
job-board/
├── server/                 # Node.js + Express backend
│   ├── models/            # Mongoose schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── controllers/       # Business logic
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   ├── middleware/        # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── config/            # Configuration
│   │   ├── database.js
│   │   └── emailConfig.js
│   ├── uploads/           # Resume storage
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── client/                # React frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   │   ├── Navigation.js
    │   │   ├── JobCard.js
    │   │   └── LoadingSpinner.js
    │   ├── pages/        # Page components
    │   │   ├── HomePage.js
    │   │   ├── JobsListingPage.js
    │   │   ├── JobDetailPage.js
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── CandidateDashboard.js
    │   │   └── EmployerDashboard.js
    │   ├── context/      # Context API
    │   │   └── AuthContext.js
    │   ├── services/     # API calls
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## ✨ Features

### Authentication & Authorization
- ✅ User registration with role selection (Employer/Candidate)
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control
- ✅ Token persistence with localStorage

### Job Management
- ✅ Post jobs (Employer only)
- ✅ Edit/Delete jobs (Employer only)
- ✅ Browse all jobs with pagination
- ✅ Search jobs by title, location, type
- ✅ View detailed job information
- ✅ Full-text search capability

### Job Applications
- ✅ Apply for jobs with cover letter
- ✅ Resume upload (PDF/DOC, max 5MB)
- ✅ Track application status (pending, reviewed, accepted, rejected)
- ✅ Prevent duplicate applications
- ✅ Download resumes (Employer only)

### User Dashboards
**Candidate Dashboard:**
- View and edit profile
- Track all applications and their status
- Update skills and experience

**Employer Dashboard:**
- Post new jobs
- View all job postings
- See applications for each job
- Update application status

### Email Notifications
- ✅ Confirmation email after applying
- ✅ Notification to employer on new application
- ✅ Application status update emails
- ✅ Uses nodemailer with Gmail

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Tailwind CSS for modern styling
- ✅ Loading spinners for better UX
- ✅ Error handling and validation
- ✅ Color-coded status indicators

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/profile` | Yes | Get current user profile |
| PUT | `/api/auth/profile` | Yes | Update user profile |

### Jobs
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | `/api/jobs` | No | Get all jobs |
| GET | `/api/jobs/latest` | No | Get latest 5 jobs |
| GET | `/api/jobs/search` | No | Search jobs |
| GET | `/api/jobs/:id` | No | Get job details |
| POST | `/api/jobs` | Yes | Create job (Employer) |
| PUT | `/api/jobs/:id` | Yes | Update job (Employer) |
| DELETE | `/api/jobs/:id` | Yes | Delete job (Employer) |
| GET | `/api/jobs/employer/my-jobs` | Yes | Get employer's jobs |

### Applications
| Method | Endpoint | Protected | Role | Description |
|--------|----------|-----------|------|-------------|
| POST | `/api/applications` | Yes | Candidate | Apply for job |
| GET | `/api/applications/user` | Yes | Candidate | Get candidate applications |
| GET | `/api/applications/employer` | Yes | Employer | Get employer applications |
| GET | `/api/applications/:id` | Yes | Both | Get application details |
| PUT | `/api/applications/:id/status` | Yes | Employer | Update application status |
| GET | `/api/applications/:id/resume` | Yes | Both | Download resume |

---

## 🛠 Technologies Used

### Backend
- **Express.js** - REST API framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ORM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email sending
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - CSS framework
- **Context API** - State management

### Tools
- **nodemon** - Auto-reload backend
- **postman/insomnia** - API testing

---

## 🔐 Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌐 Deployment

### Frontend Deployment (Netlify)
1. Build: `npm run build`
2. Deploy `build` folder to Netlify
3. Set environment variable: `REACT_APP_API_URL=<your-backend-url>`

### Backend Deployment (Railway/Render)
1. Push code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster at mongodb.com
2. Create IP whitelist entry
3. Get connection string
4. Add to `MONGODB_URI` in server `.env`

---

## 📝 How to Use

### For Candidates
1. Register as a Job Seeker
2. Complete your profile (skills, experience, etc.)
3. Browse jobs on the Jobs page
4. Search for specific jobs
5. Click on a job to see details
6. Click "Apply Now" and upload resume
7. Track applications in Dashboard

### For Employers
1. Register as an Employer
2. Go to Dashboard
3. Click "+ Post New Job"
4. Fill job details and publish
5. View applications from candidates
6. Update application status
7. Download candidate resumes

---

## 🐛 Troubleshooting

### Backend Issues
**MongoDB Connection Error:**
- Check MongoDB URI in `.env`
- Verify IP is whitelisted in MongoDB Atlas
- Check network connectivity

**Email Not Sending:**
- Enable "Less secure app access" in Gmail
- Or use App Password instead
- Check EMAIL_USER and EMAIL_PASSWORD

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Frontend Issues
**Cannot Connect to Backend:**
- Verify backend is running on port 5000
- Check CORS configuration
- Check `REACT_APP_API_URL` in `.env`

**Login Not Working:**
- Clear localStorage
- Check backend logs
- Verify credentials

**Styles Not Loading:**
- Run `npm install -D tailwindcss postcss autoprefixer`
- Clear cache: `npm cache clean --force`

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Guide](https://www.mongodb.com/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JWT Tokens](https://jwt.io/)

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 💡 Future Enhancements

- [ ] Advanced filtering options
- [ ] Job recommendations
- [ ] Video interviews
- [ ] Payment integration
- [ ] Company profiles
- [ ] Interview scheduling
- [ ] Rating system
- [ ] Notification preferences
- [ ] Export job listings
- [ ] Analytics dashboard

---

## 📞 Support

For issues or questions:
1. Check the README files in `server/` and `client/`
2. Review browser console for errors
3. Check backend logs
4. Create an issue with detailed description

---

## ✅ Checklist for Deployment

- [ ] Replace MongoDB URI with production database
- [ ] Generate secure JWT secret
- [ ] Set up email service
- [ ] Update FRONTEND_URL for production
- [ ] Test all API endpoints
- [ ] Test authentication flow
- [ ] Test file uploads
- [ ] Test email notifications
- [ ] Build and test frontend production build
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Set up monitoring/logging
- [ ] Configure SSL/HTTPS

---

**Happy Coding! 🎉**

For detailed setup instructions, see [Backend README](server/README.md) and [Frontend README](client/README.md).
