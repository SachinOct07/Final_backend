const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  // Normalize path to use forward slashes for URLs
  const video = req.file.path.replace(/\\/g, '/');
  try {
    const project = new Project({ title, description, video });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const { title, description } = req.body;
  // Normalize path to use forward slashes for URLs
  const video = req.file ? req.file.path.replace(/\\/g, '/') : req.body.video;
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { title, description, video }, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};