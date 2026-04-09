import { useEffect, useState } from 'react';
import axios from '../api/api';
import { useAuth } from '../context/AuthContext';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({});
  const [form, setForm] = useState({ title: '', company: '', location: '', salary: '', description: '' });
  const [message, setMessage] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/jobs');
      setJobs(res.data.filter((job) => job.createdBy === user.id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { if (user) fetchJobs(); }, [user]);

  const fetchApplicants = async (jobId) => {
    try {
      const res = await axios.get(`/jobs/${jobId}/applicants`);
      setApplicants((prev) => ({ ...prev, [jobId]: res.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/jobs', form);
      setMessage('Job created successfully.');
      setForm({ title: '', company: '', location: '', salary: '', description: '' });
      fetchJobs();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to create job.');
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`/jobs/${jobId}`);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className='section header-row'>
        <div>
          <h2>Employer Dashboard</h2>
          <p>Manage your listings and review candidates.</p>
        </div>
      </div>
      <div className='grid-2'>
        <div className='detail-card'>
          <h3>Create New Job</h3>
          {message && <div className='message'>{message}</div>}
          <form onSubmit={handleCreate}>
            <input value={form.title} name='title' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder='Job title' required />
            <input value={form.company} name='company' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder='Company' required />
            <input value={form.location} name='location' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder='Location' required />
            <input value={form.salary} name='salary' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder='Salary' required />
            <textarea value={form.description} name='description' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder='Description' required rows='5' />
            <button className='button'>Create Listing</button>
          </form>
        </div>
        <div className='detail-card'>
          <h3>Your Jobs</h3>
          {jobs.length ? jobs.map((job) => (
            <div key={job._id} className='job-card compact'>
              <div>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
              </div>
              <div className='job-actions'>
                <button onClick={() => fetchApplicants(job._id)} className='button small secondary'>Applicants</button>
                <button onClick={() => handleDelete(job._id)} className='button small danger'>Delete</button>
              </div>
              {applicants[job._id] && (
                <div className='applicant-list'>
                  <strong>Applicants</strong>
                  {applicants[job._id].length ? applicants[job._id].map((app) => (
                    <div key={app._id} className='applicant-item'>
                      <span>{app.userId?.name} ({app.userId?.email})</span>
                      <a href={`http://localhost:5000/uploads/${app.resume}`} target='_blank' rel='noreferrer'>Resume</a>
                    </div>
                  )) : <p>No applicants yet.</p>}
                </div>
              )}
            </div>
          )) : <p>No jobs posted yet.</p>}
        </div>
      </div>
    </section>
  );
};

export default EmployerDashboard;
