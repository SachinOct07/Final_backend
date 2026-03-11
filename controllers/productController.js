const Product = require('../models/Product');
const Stock = require('../models/Stock');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, category, description } = req.body;
  // Cloudinary returns the full URL in req.file.path
  const image = req.file ? req.file.path : null;
  try {
    const product = new Product({ name, category, description, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, category, description } = req.body;
  // Use new Cloudinary URL if file uploaded, otherwise keep existing
  const image = req.file ? req.file.path : req.body.image;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { name, category, description, image }, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};