const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  cuisine: { type: String, required: true },
  category: { type: String, required: true },
  dietary: [{ type: String }],
  spiceLevel: { type: String },
  portionsAvailable: { type: Number, required: true },
  portionsTotal: { type: Number, required: true },
  images: [{ type: String }],
  cookId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupTimeSlots: [{
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    isBooked: { type: Boolean, default: false }
  }],
  ingredients: [{ type: String }],
  allergens: [{ type: String }],
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  location: { type: String },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);
