import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectAPI, taskAPI } from '../services/api';
import Loading from '../components/Loading';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskData, setTaskData] = useState({ title: '', description: '', deadline: '', status: 'todo' });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const pRes = await projectAPI.getAll();
      const currentProject = pRes.data.find(p => p._id === id);
      setProject(currentProject);
      
      const tRes = await taskAPI.getByProject(id);
      setTasks(tRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickComplete = async (task) => {
    try {
      const newStatus = task.status === 'done' ? 'todo' : 'done';
      await taskAPI.update(task._id, { status: newStatus });
      fetchData();
    } catch (err) {
      alert('Error updating objective status');
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm('Delete this entire project? This action is irreversible.')) {
      await projectAPI.delete(id);
      navigate('/');
    }
  };

  const handleTaskSubmit = async (e) => {
    // ... rest of handleTaskSubmit (unchanged)
    e.preventDefault();
    try {
      if (editingTask) {
        await taskAPI.update(editingTask._id, taskData);
      } else {
        await taskAPI.create({ ...taskData, projectId: id });
      }
      setShowTaskModal(false);
      setEditingTask(null);
      setTaskData({ title: '', description: '', deadline: '', status: 'todo' });
      fetchData();
    } catch (err) {
      alert('Error saving objective');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskData({
      title: task.title,
      description: task.description || '',
      deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '',
      status: task.status
    });
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Remove this objective?')) {
      await taskAPI.delete(taskId);
      fetchData();
    }
  };

  if (loading) return <Loading />;
  if (!project) return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h2>Project not found</h2>
      <Link to="/" className="button secondary" style={{ marginTop: '1rem' }}>Return to Dashboard</Link>
    </div>
  );

  const progress = tasks.length > 0 ? (tasks.filter(t => t.status === 'done').length / tasks.length) * 100 : 0;

  return (
    <div className="container">
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <Link to="/" style={{ 
            color: 'var(--primary)', 
            textDecoration: 'none', 
            fontSize: '0.85rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            &larr; Back to Dashboard
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{project.title}</h1>
            <span className={`badge ${project.status || 'active'}`}>{project.status || 'active'}</span>
          </div>
          <p style={{ fontSize: '1.1rem' }}>{project.description}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleDeleteProject} className="button danger" style={{ padding: '0.6rem 1.2rem' }}>
            Terminate Project
          </button>
        </div>
      </div>


      {/* Progress Section */}
      <div className="card" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--primary)' }}>
        <div className="progress-container" style={{ margin: 0 }}>
          <div className="progress-header">
            <span style={{ fontSize: '1rem', fontWeight: '700' }}>Development Trajectory</span>
            <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{Math.round(progress)}% Complete</span>
          </div>
          <div className="progress-bar" style={{ height: '14px' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tasks Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem' }}>Project Objectives ({tasks.length})</h2>
        <button onClick={() => { setEditingTask(null); setShowTaskModal(true); }} className="button">
          + Add Objective
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="grid">
        {tasks.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No objectives defined for this project.
          </div>
        ) : (
          tasks.map(task => {
            const overdue = task.status !== 'done' && task.deadline && new Date(task.deadline) < new Date();
            return (
              <div key={task._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text)' }}>
                    {task.title}
                  </h3>
                  <span className={`badge ${task.status === 'in-progress' ? 'in-progress' : task.status}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
                <p style={{ margin: '0.5rem 0 1.5rem 0', flex: 1, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {task.description || 'No detailed description.'}
                </p>
                
                {task.deadline && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
                    <span style={{ opacity: 0.5 }}>Deadline:</span>
                    <span className={overdue ? 'overdue' : ''} style={{ fontWeight: 600 }}>
                      {new Date(task.deadline).toLocaleDateString()} {overdue && '(CRITICAL)'}
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                  <button onClick={() => handleEditTask(task)} className="button secondary" style={{ flex: 1, padding: '0.5rem' }}>Modify</button>
                  <button 
                    onClick={() => handleQuickComplete(task)} 
                    className="button secondary" 
                    style={{ 
                      padding: '0.5rem 0.8rem', 
                      color: task.status === 'done' ? 'var(--success)' : 'var(--text-muted)',
                      borderColor: task.status === 'done' ? 'var(--success)' : 'rgba(255,255,255,0.1)',
                      opacity: task.status === 'done' ? 1 : 0.4
                    }}
                  >
                    ✓
                  </button>
                  <button onClick={() => handleDeleteTask(task._id)} className="button secondary" style={{ color: 'var(--error)', borderColor: 'rgba(244,63,94,0.2)', padding: '0.5rem 0.8rem' }}>&times;</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 
        }}>
          <div className="card auth-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingTask ? 'Modify Objective' : 'New Objective'}</h2>
            <form onSubmit={handleTaskSubmit}>
              <div className="form-group">
                <label>Objective Title</label>
                <input 
                  type="text" 
                  value={taskData.title} 
                  onChange={(e) => setTaskData({...taskData, title: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  value={taskData.description} 
                  onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Deadline</label>
                  <input 
                    type="date" 
                    value={taskData.deadline} 
                    onChange={(e) => setTaskData({...taskData, deadline: e.target.value})} 
                  />
                </div>
                <div>
                  <label>Status</label>
                  <select 
                    value={taskData.status} 
                    onChange={(e) => setTaskData({...taskData, status: e.target.value})}
                  >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowTaskModal(false)} className="button secondary">Cancel</button>
                <button type="submit" className="button">Save Details</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
