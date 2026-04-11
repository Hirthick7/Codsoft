# Job Board Backend API

Complete backend API for the Job Board application built with Express.js and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB installation
- Gmail account (for email notifications)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file and add your configuration:
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
   - MongoDB URI
   - JWT Secret (generate a random string)
   - Email credentials (Gmail or similar)
   - Frontend URL

### Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Environment Variables

- `MONGODB_URI` - Connection string for MongoDB
- `JWT_SECRET` - Secret key for JWT token generation
- `EMAIL_USER` - Email address for sending notifications
- `EMAIL_PASSWORD` - Email password or app-specific password
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Node environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/latest` - Get latest 5 jobs
- `GET /api/jobs/search` - Search jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (employer only)
- `PUT /api/jobs/:id` - Update job (employer only)
- `DELETE /api/jobs/:id` - Delete job (employer only)
- `GET /api/jobs/employer/my-jobs` - Get employer's jobs (protected)

### Applications
- `POST /api/applications` - Apply for job (candidate only)
- `GET /api/applications/user` - Get candidate's applications (protected)
- `GET /api/applications/employer` - Get employer's applications (protected)
- `GET /api/applications/:id` - Get application details (protected)
- `PUT /api/applications/:id/status` - Update application status (employer only)
- `GET /api/applications/:id/resume` - Download resume (protected)

## Project Structure

```
server/
├── models/             # Mongoose schemas
│   ├── User.js
│   ├── Job.js
│   └── Application.js
├── controllers/        # Business logic
│   ├── authController.js
│   ├── jobController.js
│   └── applicationController.js
├── routes/             # API routes
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
├── middleware/         # Custom middleware
│   ├── authMiddleware.js
│   └── errorHandler.js
├── config/             # Configuration files
│   ├── database.js
│   └── emailConfig.js
├── uploads/            # Resume upload directory
├── server.js           # Main server file
├── package.json
└── .env.example
```

## Features

- ✅ User authentication with JWT
- ✅ Role-based access control (Employer/Candidate)
- ✅ Job creation and management
- ✅ Job search functionality
- ✅ Resume upload with file validation
- ✅ Email notifications
- ✅ Application status tracking
- ✅ Error handling and validation
- ✅ CORS enabled

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- File upload validation
- Input validation with express-validator
- CORS protection
- Role-based authorization

## Notes

- Default port: 5000
- Uploads folder stores resume files
- Email notifications are sent asynchronously
- All endpoints except auth and public job routes require JWT token
- Resume files limited to 5MB (PDF/DOC files only)
