const express = require('express');
const router = express.Router();
const { getStack } = require('../utils/Stack');
const { isLoggedIn, isBuyer } = require('../middlewares/User/isLoggedin');
const Listing = require('../models/Listing/listing');

// GET /dashboard/buyer/recent
// Return top 5 from buyer's Stack (recently viewed)
router.get('/recent', isLoggedIn, isBuyer, async (req, res) => {
    try {
        // req.user corresponds to the JWT payload
        const userId = req.user.id || req.user._id; 
        const stack = getStack(userId);
        const recentListingIds = stack.popAll(); // array of IDs, reverse-visited order (most recent first)

        if (!recentListingIds || recentListingIds.length === 0) {
            return res.json({ success: true, recent: [] });
        }

        // Fetch corresponding listing objects from DB
        const listings = await Listing.find({ _id: { $in: recentListingIds } });

        // Return listings in the exact LIFO order of the stack
        const sortedRecent = recentListingIds.map(id => 
            listings.find(listing => listing._id.toString() === id.toString())
        ).filter(Boolean); // Filter out any deleted listings

        res.json({ success: true, recent: sortedRecent });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
