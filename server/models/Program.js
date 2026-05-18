const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  program: { type: String, required: true },
  certification: { type: String, required: true },
  faculty: { type: String, required: true },
  title: { type: String },
  info: { type: String },
  duration: { type: String },
  details: { type: String },
  curriculum: { type: String },
  imageURL: { type: String },
});

module.exports = mongoose.model('Program', programSchema);
