import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../services/api';
import Loading from '../components/Loading';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getAll();
      setProjects(res.data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectAPI.create(newProject);
      fetchProjects();
      setShowModal(false);
      setNewProject({ title: '', description: '' });
    } catch (err) {
      setError('Failed to create project');
    }
  };

  if (loading) return <Loading message="Preparing your workspace..." />;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h1>
          <p>Manage your projects and track progress effortlessly.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="button">
          + New Project
        </button>
      </div>

      {error && <p style={{ color: 'var(--error)', marginBottom: '1.5rem' }}>{error}</p>}

      {projects.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>&empty;</div>
          <h3>No projects found</h3>
          <p>Start your journey by creating your first project.</p>
          <button onClick={() => setShowModal(true)} className="button secondary" style={{ marginTop: '2rem' }}>Create Now</button>
        </div>
      ) : (
        <div className="grid">
          {projects.map((project) => {
            const progress = project.taskCount > 0 ? (project.completedTasks / project.taskCount) * 100 : 0;
            return (
              <Link to={`/project/${project._id}`} key={project._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text)' }}>
                      {project.title}
                    </h3>
                    <span className={`badge ${project.status || 'active'}`} style={{ fontSize: '0.6rem' }}>
                      {project.status || 'active'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '2rem', flex: 1 }}>
                    {project.description || 'No description provided'}
                  </p>
                  
                  <div className="progress-container">
                    <div className="progress-header">
                      <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                      <span style={{ color: 'var(--primary)' }}>{Math.round(progress)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    borderTop: '1px solid rgba(255,255,255,0.05)', 
                    paddingTop: '1.25rem',
                    marginTop: 'auto'
                  }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text)' }}>{project.taskCount}</div>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Tasks</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: '700', color: 'var(--success)' }}>{project.completedTasks}</div>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Completed</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{project.pendingTasks}</div>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pending</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Modern Modal */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 
        }}>
          <div className="card auth-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Construct New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label>Project Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Website Redesign"
                  value={newProject.title} 
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea 
                  rows="3" 
                  placeholder="What is this project about?"
                  value={newProject.description} 
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                ></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="button secondary">Dismiss</button>
                <button type="submit" className="button">Establish Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
