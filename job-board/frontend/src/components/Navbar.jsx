import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ setActive }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setActive('home');
  };

  return (
    <nav className='navbar'>
      <div className='brand'>JobBoard</div>
      <div className='links'>
        <NavLink to='/' onClick={() => setActive('home')} className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to='/jobs' onClick={() => setActive('jobs')} className={({ isActive }) => isActive ? 'active-link' : ''}>Jobs</NavLink>
        {!user && <NavLink to='/auth' className={({ isActive }) => isActive ? 'active-link' : ''}>Login / Register</NavLink>}
        {user?.role === 'employer' && <NavLink to='/employer' className={({ isActive }) => isActive ? 'active-link' : ''}>Employer</NavLink>}
        {user?.role === 'candidate' && <NavLink to='/candidate' className={({ isActive }) => isActive ? 'active-link' : ''}>Candidate</NavLink>}
        {user && <button className='button small button-white' onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
