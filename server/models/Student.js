const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: Number, required: true },
  class: { type: Number, required: true },
  section: { type: String, required: true },
  fatherName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  admissionDate: { type: String },
  bloodGroup: { type: String },
  photo: { type: String, default: null },
  attendance: { type: Number, default: 0 },
  grades: { type: Map, of: String, default: {} },
  achievements: [{ type: String }],
});

module.exports = mongoose.model('Student', studentSchema);
