const Purchase = require('../../models/Purchases/purchases');

// Get all purchases made by the logged-in buyer
exports.getMyPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ buyerId: req.user._id }).populate('listingId').sort({ createdAt: -1 });
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all sales made by the logged-in seller
exports.getMySales = async (req, res) => {
    try {
        // Find purchases where the listing belongs to the seller
        // We can do this via an aggregation or by finding listings first.
        // Actually, Purchase doesn't have sellerId directly, but we can populate listingId.
        const purchases = await Purchase.find().populate({
            path: 'listingId',
            match: { sellerId: req.user._id }
        }).sort({ createdAt: -1 });

        // Filter out null listingIds (which means it didn't match the seller)
        const mySales = purchases.filter(p => p.listingId != null);
        
        res.status(200).json(mySales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
