/**
 * Employer Dashboard
 * Post new jobs and view applications
 */

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { jobsAPI, applicationsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const EmployerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: user?.company || '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    experience: 'Mid-level',
    skills: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        jobsAPI.getEmployerJobs(),
        applicationsAPI.getEmployerApplications(),
      ]);
      setJobs(jobsRes.data.jobs);
      setApplications(appsRes.data.applications);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await jobsAPI.createJob({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      });

      alert('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        company: user?.company || '',
        location: '',
        salary: '',
        jobType: 'Full-time',
        experience: 'Mid-level',
        skills: '',
      });
      setShowJobForm(false);
      fetchData();
    } catch (error) {
      alert('Error posting job');
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, status, '');
      alert('Application status updated!');
      fetchData();
    } catch (error) {
      alert('Error updating application');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>

        {/* Posted Jobs Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Job Postings</h2>
            <button
              onClick={() => setShowJobForm(!showJobForm)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {showJobForm ? 'Cancel' : '+ Post New Job'}
            </button>
          </div>

          {/* Job Form */}
          {showJobForm && (
            <form onSubmit={handleSubmitJob} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Post a New Job</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Developer"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., New York, USA"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Salary
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g., $80,000 - $120,000"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Job Type
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="Entry-level">Entry-level</option>
                      <option value="Mid-level">Mid-level</option>
                      <option value="Senior">Senior</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed job description..."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    rows="6"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Required Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="JavaScript, React, Node.js"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition"
                >
                  Post Job
                </button>
              </div>
            </form>
          )}

          {/* Jobs List */}
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.location}</p>
                  <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                    {job.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => setSelectedJob(job._id === selectedJob ? null : job._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {selectedJob === job._id ? 'Hide Applications' : 'View Applications'}
                    </button>
                  </div>

                  {/* Applications for this job */}
                  {selectedJob === job._id && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="font-semibold mb-3">
                        Applications for this job:{' '}
                        {applications.filter(app => app.jobId._id === job._id).length}
                      </p>

                      {applications.filter(app => app.jobId._id === job._id).length > 0 ? (
                        <div className="space-y-2">
                          {applications
                            .filter(app => app.jobId._id === job._id)
                            .map(app => (
                              <div key={app._id} className="bg-gray-50 p-3 rounded">
                                <p className="font-semibold">{app.userId.name}</p>
                                <p className="text-sm text-gray-600">{app.userId.email}</p>
                                <div className="flex gap-2 mt-2">
                                  <select
                                    value={app.status}
                                    onChange={(e) =>
                                      handleUpdateStatus(app._id, e.target.value)
                                    }
                                    className="text-sm px-2 py-1 border rounded"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                  </select>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No applications yet</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              You haven't posted any jobs yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
