const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['customer', 'cook'], default: 'customer' },
  avatar: { type: String, default: '' },
  // Common ratings
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  // Cook-specific fields
  bio: { type: String },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);