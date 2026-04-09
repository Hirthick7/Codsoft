# Job Board Web Application

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set values
4. `npm run start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run build`

### Fullstack same-port setup
1. Build the frontend: `cd frontend && npm run build`
2. Start the backend: `cd backend && npm install && npm run start`
3. Open `http://localhost:5000`

### Seed data
1. `cd backend`
2. `npm run seed`
3. Sample users:
   - Employer: `employer@acme.com` / `password123`
   - Candidate: `candidate@demo.com` / `password123`

### Notes
- Backend and frontend are served together on `http://localhost:5000`
- Resume upload files are available under `/uploads`
