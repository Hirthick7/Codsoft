import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import AuthPage from './pages/AuthPage';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/jobs')) setActive('jobs');
    else if (path === '/') setActive('home');
  }, []);

  return (
    <div className='app-shell'>
      <Navbar active={active} setActive={setActive} />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/jobs/:id' element={<JobDetails />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/employer' element={<ProtectedRoute role='employer'><EmployerDashboard /></ProtectedRoute>} />
          <Route path='/candidate' element={<ProtectedRoute role='candidate'><CandidateDashboard /></ProtectedRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
