import { useEffect, useState } from 'react';
import axios from '../api/api';
import JobCard from '../components/JobCard';
import sampleJobs from '../data/sampleJobs';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/jobs').then((res) => {
      setJobs(res.data.slice(0, 4));
    }).catch(() => {
      setJobs(sampleJobs.slice(0, 4));
    });
  }, []);

  return (
    <section>
      <div className='hero hero-large'>
        <div>
          <h1>Find your next opportunity</h1>
          <p>Search jobs, apply with your resume, and grow your career.</p>
          <div className='hero-badges'>
            <span>Remote</span>
            <span>Full-time</span>
            <span>Hiring now</span>
          </div>
        </div>
      </div>
      <div className='section stats-grid'>
        <div className='stat-card'>
          <h3>120+</h3>
          <p>Open roles</p>
        </div>
        <div className='stat-card'>
          <h3>35+</h3>
          <p>Trusted employers</p>
        </div>
        <div className='stat-card'>
          <h3>98%</h3>
          <p>Successful applications</p>
        </div>
      </div>
      <div className='section'>
        <div className='section-header'>
          <h2>Featured Jobs</h2>
          <p>Trusted employers and modern roles for every career stage.</p>
        </div>
        <div className='grid'>
          {jobs.length ? jobs.map((job) => <JobCard key={job._id || job.title} job={job} />) : <p>No jobs available yet.</p>}
        </div>
      </div>
    </section>
  );
};

export default Home;
