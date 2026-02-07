const Slide = require('../models/Slide');

exports.getSlides = async (req, res) => {
  try {
    const slides = await Slide.find();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSlide = async (req, res) => {
  const { text } = req.body;
  // Cloudinary returns the full URL in req.file.path
  const image = req.file ? req.file.path : null;
  try {
    const slide = new Slide({ image, text });
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSlide = async (req, res) => {
  const { text } = req.body;
  // Use new Cloudinary URL if file uploaded, otherwise keep existing
  const image = req.file ? req.file.path : req.body.image;
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, { image, text }, { new: true });
    res.json(slide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    await Slide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};