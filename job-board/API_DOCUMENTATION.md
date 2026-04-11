# API Documentation - Job Board Backend

Complete API reference for the Job Board backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### Register User
```
POST /api/auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "candidate",
  "company": "Tech Corp"  // Required only if role = employer
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "candidate",
    "company": null
  }
}
```

---

### Login User
```
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "candidate"
  }
}
```

---

### Get User Profile
```
GET /api/auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "candidate",
    "title": "Senior Developer",
    "location": "New York",
    "phone": "+1234567890",
    "bio": "Experienced developer...",
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

---

### Update User Profile
```
PUT /api/auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "John Doe",
  "title": "Senior Developer",
  "location": "New York, USA",
  "phone": "+1234567890",
  "bio": "Experienced full-stack developer...",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB"]
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": { /* updated user data */ }
}
```

---

## Job Endpoints

### Get All Jobs
```
GET /api/jobs?page=1&limit=10
```

**Query Parameters:**
- `page` (optional): Page number, default = 1
- `limit` (optional): Items per page, default = 10

**Response (200):**
```json
{
  "jobs": [
    {
      "_id": "job_id",
      "title": "Senior Developer",
      "company": "Tech Corp",
      "location": "New York",
      "salary": "$80,000 - $120,000",
      "jobType": "Full-time",
      "experience": "Senior",
      "description": "We are looking for...",
      "skills": ["JavaScript", "React", "Node.js"],
      "createdBy": {
        "_id": "employer_id",
        "name": "Jane Smith",
        "company": "Tech Corp",
        "email": "jane@techcorp.com"
      },
      "createdAt": "2024-04-11T10:30:00Z",
      "updatedAt": "2024-04-11T10:30:00Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

---

### Get Latest 5 Jobs
```
GET /api/jobs/latest
```

**Response (200):**
```json
{
  "jobs": [
    { /* job objects */ }
  ]
}
```

---

### Search Jobs
```
GET /api/jobs/search?q=developer&location=New York&jobType=Full-time
```

**Query Parameters:**
- `q` (optional): Search keyword
- `location` (optional): Filter by location
- `jobType` (optional): Filter by job type

**Response (200):**
```json
{
  "jobs": [ /* matching jobs */ ],
  "total": 15
}
```

---

### Get Job Details
```
GET /api/jobs/:id
```

**Response (200):**
```json
{
  "job": {
    "_id": "job_id",
    "title": "Senior Developer",
    "company": "Tech Corp",
    "location": "New York",
    "description": "Full job description...",
    "salary": "$80,000 - $120,000",
    "jobType": "Full-time",
    "experience": "Senior",
    "skills": ["JavaScript", "React"],
    "createdBy": {
      "_id": "employer_id",
      "name": "Jane Smith",
      "company": "Tech Corp",
      "email": "jane@techcorp.com",
      "companyPhone": "+1234567890"
    },
    "createdAt": "2024-04-11T10:30:00Z"
  }
}
```

---

### Create Job (Employer Only)
```
POST /api/jobs
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Senior Developer",
  "company": "Tech Corp",
  "location": "New York, USA",
  "description": "We're hiring a senior developer...",
  "salary": "$80,000 - $120,000",
  "jobType": "Full-time",
  "experience": "Senior",
  "skills": "JavaScript, React, Node.js"
}
```

**Response (201):**
```json
{
  "message": "Job created successfully",
  "job": { /* job object */ }
}
```

---

### Update Job (Employer Only)
```
PUT /api/jobs/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:** (same as create)

**Response (200):**
```json
{
  "message": "Job updated successfully",
  "job": { /* updated job */ }
}
```

---

### Delete Job (Employer Only)
```
DELETE /api/jobs/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Job deleted successfully"
}
```

---

### Get Employer's Jobs
```
GET /api/jobs/employer/my-jobs
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "jobs": [ /* employer's jobs */ ],
  "total": 5
}
```

---

## Application Endpoints

### Apply for Job (Candidate Only)
```
POST /api/applications
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (form data):**
- `jobId` (required): Job ID
- `coverLetter` (optional): Cover letter text
- `resume` (optional): Resume file (PDF/DOC, max 5MB)

**Response (201):**
```json
{
  "message": "Application submitted successfully. Confirmation email sent!",
  "application": {
    "_id": "app_id",
    "userId": "user_id",
    "jobId": "job_id",
    "status": "pending",
    "coverLetter": "I am very interested...",
    "resume": {
      "filename": "resume.pdf",
      "filepath": "uploads/1234567890-resume.pdf",
      "uploadedAt": "2024-04-11T10:30:00Z"
    },
    "createdAt": "2024-04-11T10:30:00Z"
  }
}
```

---

### Get Candidate Applications
```
GET /api/applications/user
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "applications": [
    {
      "_id": "app_id",
      "userId": "user_id",
      "jobId": {
        "_id": "job_id",
        "title": "Senior Developer",
        "company": "Tech Corp",
        "location": "New York",
        "salary": "$80,000 - $120,000"
      },
      "status": "pending",
      "createdAt": "2024-04-11T10:30:00Z"
    }
  ],
  "total": 3
}
```

---

### Get Employer Applications
```
GET /api/applications/employer
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "applications": [
    {
      "_id": "app_id",
      "userId": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "skills": ["JavaScript", "React"]
      },
      "jobId": {
        "_id": "job_id",
        "title": "Senior Developer",
        "company": "Tech Corp"
      },
      "status": "pending",
      "resume": { /* resume object */ },
      "createdAt": "2024-04-11T10:30:00Z"
    }
  ],
  "total": 12
}
```

---

### Get Application Details
```
GET /api/applications/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "application": {
    "_id": "app_id",
    "userId": { /* user details */ },
    "jobId": { /* job details */ },
    "status": "pending",
    "coverLetter": "...",
    "resume": { /* resume info */ },
    "createdAt": "2024-04-11T10:30:00Z"
  }
}
```

---

### Update Application Status (Employer Only)
```
PUT /api/applications/:id/status
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "status": "reviewed",
  "notes": "Great candidate, will schedule interview"
}
```

**Status values:** `pending`, `reviewed`, `accepted`, `rejected`

**Response (200):**
```json
{
  "message": "Application status updated successfully",
  "application": { /* updated application */ }
}
```

---

### Download Resume
```
GET /api/applications/:id/resume
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** File download (blob)

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields",
  "errors": ["Field1 is required", "Field2 is invalid"]
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Only employers can perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Job not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error |

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "candidate"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Jobs
```bash
curl http://localhost:5000/api/jobs
```

### Search Jobs
```bash
curl "http://localhost:5000/api/jobs/search?q=developer&location=New%20York"
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- Express rate limit middleware
- Redis-based rate limiting
- API key authentication

---

## Pagination

For endpoints that support pagination:
- Default page: 1
- Default limit: 10
- Maximum limit: 100

Example:
```
GET /api/jobs?page=2&limit=20
```

---

## Sorting

Most endpoints return results sorted by `createdAt` in descending order (newest first).

---

For more details, check individual README files or the source code comments.
