const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String },
  invoiceDate: { type: Date, required: true },
  items: [{
    productId: { type: String },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
  }],
  discount: { type: Number, default: 0 },
  tax: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);