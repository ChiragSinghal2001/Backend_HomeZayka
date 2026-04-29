const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cookId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  portions: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  pickupTime: {
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String }
  },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
