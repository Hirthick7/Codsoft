import { useEffect, useState } from 'react';
import axios from '../api/api';
import JobCard from '../components/JobCard';
import sampleJobs from '../data/sampleJobs';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/jobs?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`);
      setJobs(res.data.length ? res.data : sampleJobs);
    } catch (error) {
      setJobs(sampleJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <section>
      <div className='section header-row'>
        <div>
          <h2>All Jobs</h2>
          <p>Explore roles by title, company, and location.</p>
        </div>
        <div className='small-highlight'>Updated hourly</div>
      </div>
      <div className='filters'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search title...' />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
        <button className='button' onClick={fetchJobs}>Search</button>
      </div>
      {loading ? <p>Loading jobs...</p> : <div className='grid'>{jobs.map((job) => <JobCard key={job._id || job.title} job={job} />)}</div>}
    </section>
  );
};

export default Jobs;
