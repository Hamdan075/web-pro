const mongoose = require('mongoose');

const footerContactNumSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model('FooterContactNum', footerContactNumSchema);
