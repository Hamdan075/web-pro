const mongoose = require('mongoose');

const navLinkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  link: { type: String, default: '' },
});

module.exports = mongoose.model('NavLink', navLinkSchema);
