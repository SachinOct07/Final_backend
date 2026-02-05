const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const categories = await Category.find(query);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  const { name, type } = req.body;
  try {
    const category = new Category({ name, type });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({
        message: `A ${type} category with the name "${name}" already exists.`
      });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, type } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { name, type }, { new: true });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};