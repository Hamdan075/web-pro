const mongoose = require('mongoose');

const missionVisionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model('MissionVision', missionVisionSchema);
