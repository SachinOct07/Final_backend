const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['product', 'stock'] }, // 'product' or 'stock'
}, { timestamps: true });

// Compound index to ensure unique names within each type
categorySchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);