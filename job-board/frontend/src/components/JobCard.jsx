import { Link } from 'react-router-dom';

const JobCard = ({ job }) => (
  <article className='job-card'>
    <div>
      <div className='job-card-header'>
        <h3>{job.title}</h3>
        <span className='pill'>{job.location || 'Remote'}</span>
      </div>
      <p className='meta'>{job.company}</p>
      <p>{job.description?.slice(0, 120)}...</p>
    </div>
    <div className='job-card-footer'>
      <span className='salary'>{job.salary || 'Competitive salary'}</span>
      <Link to={`/jobs/${job._id}`} className='button small'>View</Link>
    </div>
  </article>
);

export default JobCard;
