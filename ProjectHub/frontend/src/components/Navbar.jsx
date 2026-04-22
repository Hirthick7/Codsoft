import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ 
      background: 'rgba(15, 23, 42, 0.8)', 
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{ 
        fontSize: '1.5rem', 
        fontWeight: '800', 
        background: 'linear-gradient(to right, #3b82f6, #6366f1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textDecoration: 'none',
        letterSpacing: '-0.05em'
      }}>
        ProjectHub
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {token ? (
          <>
            <Link to="/" style={{ 
              textDecoration: 'none', 
              color: '#94a3b8', 
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'color 0.2s'
            }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className="button secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ 
              textDecoration: 'none', 
              color: '#94a3b8', 
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Login
            </Link>
            <Link to="/register" className="button" style={{ 
              textDecoration: 'none', 
              padding: '0.5rem 1.2rem',
              fontSize: '0.85rem'
            }}>
              Join Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
