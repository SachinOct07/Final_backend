const Scheme = require('../models/Scheme');

exports.getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createScheme = async (req, res) => {
  const { title, description } = req.body;
  // Normalize path to use forward slashes for URLs
  const image = req.file ? req.file.path.replace(/\\/g, '/') : null;
  try {
    const scheme = new Scheme({ title, description, image });
    await scheme.save();
    res.status(201).json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateScheme = async (req, res) => {
  const { title, description } = req.body;
  // Normalize path to use forward slashes for URLs
  const image = req.file ? req.file.path.replace(/\\/g, '/') : req.body.image;
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, { title, description, image }, { new: true });
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteScheme = async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scheme deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};