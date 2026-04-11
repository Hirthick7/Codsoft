/**
 * Jobs Listing Page
 * Browse all jobs with search and filter functionality
 */

import React, { useState, useEffect, useCallback } from 'react';
import { jobsAPI } from '../services/api';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';

const JobsListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [page, setPage] = useState(1);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      let response;

      if (search || location || jobType) {
        response = await jobsAPI.searchJobs(search, location, jobType);
        setJobs(response.data.jobs);
      } else {
        response = await jobsAPI.getAllJobs(page, 10);
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [search, location, jobType, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Search Jobs</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Job title or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Jobs Grid */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No jobs found</p>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {jobs.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsListingPage;
