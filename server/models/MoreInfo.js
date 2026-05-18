const mongoose = require('mongoose');

const moreInfoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model('MoreInfo', moreInfoSchema);
