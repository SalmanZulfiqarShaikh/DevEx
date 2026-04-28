const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }
}, { timestamps: true });

module.exports = mongoose.model("Favorites", favoritesSchema);
