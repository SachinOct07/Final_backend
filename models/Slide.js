const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  image: { type: String, required: true }, // path to image
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Slide', slideSchema);