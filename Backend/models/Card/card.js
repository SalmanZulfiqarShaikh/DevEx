const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardholderName: { type: String, required: true },
  last4:     { type: String, required: true, maxlength: 4 },
  brand:     { type: String, enum: ['Visa', 'Mastercard', 'Amex', 'Other'], default: 'Visa' },
  expiry:    { type: String, required: true }, // MM/YY
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', cardSchema);
