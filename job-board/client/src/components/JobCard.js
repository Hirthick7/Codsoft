/**
 * Job Card Component
 * Displays a single job listing
 */

import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-l-4 border-blue-600">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
        
        <div className="space-y-2 text-gray-600 mb-4">
          <p className="flex items-center">
            <span className="font-semibold mr-2">Company:</span> {job.company}
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-2">Location:</span> {job.location}
          </p>
          {job.salary && (
            <p className="flex items-center">
              <span className="font-semibold mr-2">Salary:</span> {job.salary}
            </p>
          )}
          <p className="flex items-center">
            <span className="font-semibold mr-2">Type:</span> {job.jobType}
          </p>
        </div>

        <p className="text-gray-700 text-sm line-clamp-2 mb-4">
          {job.description.substring(0, 150)}...
        </p>

        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs text-gray-600">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default JobCard;
