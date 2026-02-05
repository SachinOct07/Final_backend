const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  // Optional reference to a product document; explicitly not required to prevent validation errors
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false, default: null },
  productName: { type: String, required: true }, // Store product name directly
  productId: { type: String, required: true }, // Custom product ID
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  quantity: { type: Number, required: true, default: 0 },
  rate: { type: Number, required: true, default: 0 }, // Price per unit
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);