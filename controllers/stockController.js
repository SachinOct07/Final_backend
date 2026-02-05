const Stock = require('../models/Stock');
const Product = require('../models/Product');

exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('product').populate('category');
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStock = async (req, res) => {
  const { product, productName, productId, category, quantity, rate } = req.body;
  try {
    const stock = new Stock({
      product: product || null,
      productName,
      productId,
      category,
      quantity,
      rate: rate || 0,
    });
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.updateStock = async (req, res) => {
  const { quantity, rate } = req.body;
  try {
    const updateData = {};
    if (quantity !== undefined && quantity !== '') updateData.quantity = quantity;
    if (rate !== undefined && rate !== '') updateData.rate = rate;

    const stock = await Stock.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('category');
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock item not found' });
    res.json({ message: 'Stock deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStockByProduct = async (req, res) => {
  try {
    const stock = await Stock.findOne({ product: req.params.productId });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};