const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  buyerId:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  stripeSessionId: { type: String },
  amountPaid:      { type: Number },
  purchasedAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);