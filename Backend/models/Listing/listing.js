const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, maxlength: 80 },
    description: { type: String, required: true, maxlength: 1000 },
    longDescription: { type: String, maxlength: 5000 },
    price: { type: Number, required: true },
    category: { type: String },
    demoUrl: { type: String },
    repoUrl: { type: String },
    images: [{ type: String }], // Store up to 3 image URLs
    clicks: { type: Number, default: 0 }, // Track popularity
    shortId: { type: String, default: () => Math.random().toString(36).substring(2, 8), unique: true },
    isApproved: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
    soldAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Listing", listingSchema);