# GoMart - Minimalist E-Commerce Platform

GoMart is a high-performance, minimalist E-Commerce application designed for speed, beauty, and simplicity. Built with the MERN stack (MongoDB, Express, React, Node.js), it features a premium "Glassmorphism" UI and heavily optimized client-side performance.

## ✨ Key Features

- **🚀 Highly Optimized Performance**:
  - Image lazy-loading and smart thumbnail fetching.
  - Debounced search logic for instant, lag-free filtering.
  - GPU-accelerated animations using `will-change`.
- **💎 Premium UI/UX**:
  - Stunning Glassmorphism design with backdrop-blur effects.
  - Responsive layout that works across all device sizes.
  - Shimmer loading states for a professional feel.
- **🛒 Shopping Experience**:
  - Full shopping cart functionality with persistent local storage.
  - Real-time product search and category filtering.
  - Dynamic price range filtering.
- **🔐 Secure Authentication**:
  - User registration and login powered by JWT (JSON Web Tokens).
  - Protected routes for order history and checkout.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Axios, React Router, Vanilla CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas).
- **Authentication**: JWT & Bcrypt.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repo** (if not already part of Codsoft):
   ```bash
   git clone https://github.com/Hirthick7/Codsoft.git
   cd Codsoft/GoMart
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**:
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

5. **Seed Data**:
   ```bash
   cd ../backend
   node seeder.js
   ```

6. **Run the Application**:

   **Start Backend**:
   ```bash
   node server.js
   ```

   **Start Frontend**:
   ```bash
   cd ../frontend
   npm run dev
   ```

---
Developed as part of the Codsoft Program. 🚀
