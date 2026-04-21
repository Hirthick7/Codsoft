/**
 * API Service
 * Centralized API calls for jobs and applications
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Jobs API
export const jobsAPI = {
  getAllJobs: (page = 1, limit = 10) =>
    axios.get(`${API_BASE_URL}/jobs`, { params: { page, limit } }),
  
  getLatestJobs: () =>
    axios.get(`${API_BASE_URL}/jobs/latest`),
  
  getJobById: (id) =>
    axios.get(`${API_BASE_URL}/jobs/${id}`),
  
  searchJobs: (query, location, jobType) =>
    axios.get(`${API_BASE_URL}/jobs/search`, {
      params: { q: query, location, jobType },
    }),
  
  createJob: (jobData) =>
    axios.post(`${API_BASE_URL}/jobs`, jobData),
  
  updateJob: (id, jobData) =>
    axios.put(`${API_BASE_URL}/jobs/${id}`, jobData),
  
  deleteJob: (id) =>
    axios.delete(`${API_BASE_URL}/jobs/${id}`),
  
  getEmployerJobs: () =>
    axios.get(`${API_BASE_URL}/jobs/employer/my-jobs`),
};

// Applications API
export const applicationsAPI = {
  applyForJob: (jobId, coverLetter, resume) => {
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('coverLetter', coverLetter);
    if (resume) {
      formData.append('resume', resume);
    }
    
    return axios.post(`${API_BASE_URL}/applications`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  getCandidateApplications: () =>
    axios.get(`${API_BASE_URL}/applications/user`),
  
  getEmployerApplications: () =>
    axios.get(`${API_BASE_URL}/applications/employer`),
  
  getApplicationDetails: (id) =>
    axios.get(`${API_BASE_URL}/applications/${id}`),
  
  updateApplicationStatus: (id, status, notes) =>
    axios.put(`${API_BASE_URL}/applications/${id}/status`, { status, notes }),
  
  downloadResume: (id) =>
    axios.get(`${API_BASE_URL}/applications/${id}/resume`, {
      responseType: 'blob',
    }),
};

const apiExport = { jobsAPI, applicationsAPI };
export default apiExport;
