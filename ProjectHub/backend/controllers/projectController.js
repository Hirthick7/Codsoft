const Project = require('../models/Project');
const Task = require('../models/Task');

exports.createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;
    const project = new Project({
      title,
      description,
      createdBy: req.user.id,
      members: members || [req.user.id]
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    // Show projects where user is creator or member
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id }
      ]
    }).populate('createdBy', 'name email');
    
    // Enrich with task counts
    const enrichedProjects = await Promise.all(projects.map(async (project) => {
      const tasks = await Task.find({ projectId: project._id });
      const completedTasks = tasks.filter(t => t.status === 'done').length;
      return {
        ...project._doc,
        taskCount: tasks.length,
        completedTasks,
        pendingTasks: tasks.length - completedTasks
      };
    }));
    
    res.json(enrichedProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ projectId: req.params.id });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
