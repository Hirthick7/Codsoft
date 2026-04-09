import { useEffect, useState } from 'react';
import axios from '../api/api';
import { useAuth } from '../context/AuthContext';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [message, setMessage] = useState('');

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/applications/user/${user.id}`);
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) fetchApplications();
  }, [user]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMessage('Profile updates can be managed through your account settings later.');
  };

  return (
    <section>
      <div className='section header-row'>
        <div>
          <h2>Candidate Dashboard</h2>
          <p>View your applications and keep track of your progress.</p>
        </div>
      </div>
      <div className='grid-2'>
        <div className='detail-card'>
          <h3>Your Profile</h3>
          {message && <div className='message'>{message}</div>}
          <form onSubmit={handleProfileUpdate}>
            <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder='Name' />
            <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder='Email' disabled />
            <button className='button'>Save Profile</button>
          </form>
        </div>
        <div className='detail-card'>
          <h3>Applications</h3>
          {applications.length ? applications.map((app) => (
            <div key={app._id} className='application-item'>
              <h4>{app.jobId?.title}</h4>
              <p>{app.jobId?.company}</p>
              <p>Status: {app.status}</p>
            </div>
          )) : <p>No applications yet.</p>}
        </div>
      </div>
    </section>
  );
};

export default CandidateDashboard;
