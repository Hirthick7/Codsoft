/**
 * Navigation Component
 * Header with links to different pages
 */

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="font-bold text-2xl hover:text-blue-100">
            🎯 Job Board
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/jobs"
              className="hover:text-blue-100 transition"
            >
              Jobs
            </Link>

            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link
                    to="/dashboard/employer"
                    className="hover:text-blue-100 transition"
                  >
                    Dashboard
                  </Link>
                )}

                {user.role === 'candidate' && (
                  <Link
                    to="/dashboard/candidate"
                    className="hover:text-blue-100 transition"
                  >
                    Dashboard
                  </Link>
                )}

                <span className="text-sm mr-2">
                  {user.name} ({user.role})
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
