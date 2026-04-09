import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/api';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/jobs/${id}`).then((res) => setJob(res.data)).catch(console.error);
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Please login as a candidate to apply.');
      return;
    }
    if (user.role !== 'candidate') {
      setMessage('Only candidates can apply for jobs.');
      return;
    }
    if (!resume) {
      setMessage('Please upload a resume before applying.');
      return;
    }
    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('resume', resume);
    try {
      await axios.post('/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMessage('Application submitted successfully.');
      setResume(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Application failed.');
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <section className='job-detail'>
      <div className='detail-card'>
        <h2>{job.title}</h2>
        <p className='meta'>{job.company} • {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p>{job.description}</p>
      </div>
      <div className='detail-card form-card'>
        <h3>Apply for this job</h3>
        {message && <div className='message'>{message}</div>}
        <form onSubmit={handleApply}>
          <label>Resume (PDF / DOC)</label>
          <input type='file' accept='.pdf,.doc,.docx' onChange={(e) => setResume(e.target.files?.[0])} />
          <button type='submit' className='button'>Submit Application</button>
        </form>
      </div>
    </section>
  );
};

export default JobDetails;
