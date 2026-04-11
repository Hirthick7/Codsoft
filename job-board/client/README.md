# Job Board Frontend - React Application

Modern React-based frontend for the Job Board application with Tailwind CSS styling.

## Features

- 🎨 Responsive design with Tailwind CSS
- 🔐 JWT-based authentication
- 📱 Mobile-friendly UI
- 🔍 Job search and filtering
- 📝 Job application system
- 👤 User profiles (Candidate & Employer)
- 📊 Dashboard for tracking applications
- ⚡ Fast and optimized performance

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Backend API running on http://localhost:5000

## Installation

1. Clone or navigate to the frontend directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend URL (if not localhost:5000):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

Development mode with hot reload:
```bash
npm run dev
```

Or:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Navigation.js
│   ├── JobCard.js
│   └── LoadingSpinner.js
├── pages/             # Page components
│   ├── HomePage.js
│   ├── JobsListingPage.js
│   ├── JobDetailPage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── CandidateDashboard.js
│   └── EmployerDashboard.js
├── context/           # Context API
│   └── AuthContext.js
├── services/          # API calls
│   └── api.js
├── App.js            # Main app routing
├── index.js          # Entry point
└── index.css         # Global styles
```

## Available Pages

### Public Pages
- **Home** (`/`) - Landing page with latest jobs
- **Jobs** (`/jobs`) - Browse all jobs with search
- **Job Detail** (`/jobs/:id`) - Full job details and apply
- **Login** (`/login`) - User login
- **Register** (`/register`) - New user registration

### Protected Pages
- **Candidate Dashboard** (`/dashboard/candidate`) - Profile and applications
- **Employer Dashboard** (`/dashboard/employer`) - Post jobs and manage applications

## Key Features

### Authentication
- Register with role selection (Candidate/Employer)
- JWT token-based login
- Persistent login using localStorage
- Role-based access control

### Job Management
- Browse all jobs with pagination
- Search jobs by title, location, and type
- View detailed job information
- Apply with resume upload

### Dashboard Features
**Candidate:**
- View and edit profile
- Track job applications and their status
- View company contact information

**Employer:**
- Post new job listings
- View job applications
- Update application status
- Track posted jobs

### UI/UX
- Clean, modern interface with Tailwind CSS
- Responsive design works on mobile, tablet, and desktop
- Loading spinners for better UX
- Error handling and validation
- Color-coded status indicators

## Technologies Used

- **React** 18.2.0 - UI library
- **React Router DOM** 6.11.0 - Client-side routing
- **Axios** 1.3.4 - HTTP client
- **Tailwind CSS** 3.3.0 - Utility-first CSS
- **PostCSS** 8.4.24 - CSS processing

## API Integration

The application connects to the backend API at `http://localhost:5000/api`

Key API endpoints used:
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/latest` - Get latest jobs
- `GET /api/jobs/search` - Search jobs
- `POST /api/jobs` - Create job (employer)
- `POST /api/applications` - Apply for job
- `GET /api/applications/user` - Get candidate applications
- `GET /api/applications/employer` - Get employer applications

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

**CORS errors:**
- Make sure backend CORS is configured to accept requests from http://localhost:3000

**API connection errors:**
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env file
- Check browser console for detailed error messages

**Token not persisting:**
- Check if localStorage is enabled in browser
- Clear browser cache and try again

## Deployment

### Netlify
1. Build the project: `npm run build`
2. Connect your Git repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variables in Netlify settings

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Other Platforms
Build output is in the `build` folder, which can be deployed to any static hosting service.

## Development Tips

- Use React DevTools extension for debugging
- Check the console for detailed error messages
- Use Network tab in DevTools to monitor API calls
- Reload page if context isn't updating

## Performance Optimization

- Code splitting with React.lazy() (can be added)
- Image optimization
- Caching strategies
- Minified CSS and JavaScript in production builds

## Contributing

1. Create a branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify backend is running and accessible
3. Check network requests in DevTools
4. Review backend logs for API errors
