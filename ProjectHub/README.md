# ProjectHub 🚀

A minimalist, high-performance Project Management application built with the MERN stack. Designed with a premium dark-mode aesthetic and focus on streamlined productivity.

## ✨ Features

- **Project Management**: Create, view, edit, and terminate projects with ease.
- **Objective Tracking**: Add multiple objectives (tasks) per project with quick-complete "Tick" functionality.
- **Premium UI/UX**:
  - Sophisticated dark-mode design with Glassmorphism.
  - Real-time progress tracking with dynamic progress bars.
  - Responsive layout for desktop and mobile.
- **Intelligent Monitoring**: Real-time project statistics (Total, Done, Pending) and overdue objective highlighting.
- **Secure Authentication**: User registration and login using JWT and encrypted password hashing (Bcrypt).

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose) - Connected via Atlas.
- **Styling**: Vanilla CSS with a custom-engineered Design System.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- MongoDB account (Atlas recommended)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hirthick7/Codsoft.git
   cd Codsoft/ProjectHub
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend**:
   ```bash
   # From the backend folder
   node server.js
   ```

2. **Start Frontend**:
   ```bash
   # From the frontend folder
   npm run dev
   ```

3. **Access**: Navigate to `http://localhost:5173`.

## 📄 License

This project is part of the Codsoft internship tasks.

---
Crafted with ❤️ by Hirthick.
