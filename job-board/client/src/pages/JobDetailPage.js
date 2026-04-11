/**
 * Job Detail Page
 * Shows full job details with apply button
 */

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    coverLetter: '',
    resume: null,
  });

  const fetchJobDetails = useCallback(async () => {
    try {
      const response = await jobsAPI.getJobById(id);
      setJob(response.data.job);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, resume: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'candidate') {
      alert('Only candidates can apply for jobs');
      return;
    }

    try {
      setApplying(true);
      await applicationsAPI.applyForJob(
        id,
        formData.coverLetter,
        formData.resume
      );

      alert('Application submitted successfully!');
      setShowApplicationForm(false);
      setFormData({ coverLetter: '', resume: null });
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/jobs')}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Jobs
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8 border-b pb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{job.company}</p>

            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                {job.location}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
                {job.jobType}
              </span>
              {job.salary && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                  {job.salary}
                </span>
              )}
              {job.experience && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded">
                  {job.experience}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Company Info */}
          <div className="mb-8 bg-gray-50 p-4 rounded">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Company: </span>
                {job.company}
              </p>
              {job.createdBy && (
                <>
                  <p>
                    <span className="font-semibold">Contact: </span>
                    {job.createdBy.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email: </span>
                    {job.createdBy.email}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Apply Button */}
          {user?.role === 'candidate' ? (
            <button
              onClick={() => setShowApplicationForm(!showApplicationForm)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              {showApplicationForm ? 'Cancel' : 'Apply Now'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Sign In to Apply
            </button>
          )}

          {/* Application Form */}
          {showApplicationForm && (
            <form onSubmit={handleApply} className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Submit Your Application</h3>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're a great fit for this role..."
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  rows="5"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Resume (PDF or DOC)
                </label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={applying}
                className="w-full bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition disabled:opacity-50"
              >
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
