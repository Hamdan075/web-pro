const mongoose = require('mongoose');

const footerContactSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

module.exports = mongoose.model('FooterContact', footerContactSchema);
