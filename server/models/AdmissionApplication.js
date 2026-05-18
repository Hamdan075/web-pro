const mongoose = require('mongoose');

const admissionApplicationSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nationality: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  howKnow: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AdmissionApplication', admissionApplicationSchema);
