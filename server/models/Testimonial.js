const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  testimonial: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, default: 'FaQuoteRight' },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
