const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['consumer', 'skilled'],
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // Common fields
  address: {
    type: String,
    default: ''
  },
  photoURL: {                
    type: String,
    required: true
  },
  // Consumer fields
  bio: {
    type: String,
    default: ''
  },
  // Skilled person fields
  skill: {
    type: String
  },
  areas_of_expertise: {
    type: [String]
  },
  service_area: {
    type: String
  },
  bvn: {
    type: String
  },
  bvn_URL: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);