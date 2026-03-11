const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  image: { type: String }, // path to image
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);