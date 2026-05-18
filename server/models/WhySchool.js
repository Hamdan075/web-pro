const mongoose = require('mongoose');

const whySchoolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reason: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model('WhySchool', whySchoolSchema);
