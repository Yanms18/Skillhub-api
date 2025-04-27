const mongoose = require('mongoose');

const HiringRequestSchema = new mongoose.Schema({
  artisanId: { type: String, required: true },
  artisanName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  jobDescription: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  startTime: { type: String, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HiringRequest', HiringRequestSchema);