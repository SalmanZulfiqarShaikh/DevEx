const Favorites = require('../../models/Favorites/favorites');

exports.addFavorite = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const { listingId } = req.body;

        // Check if already in favorites
        const existing = await Favorites.findOne({ userId, listingId });
        if (existing) return res.status(400).json({ error: "Already in favorites" });

        const favorite = await Favorites.create({ userId, listingId });
        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const { listingId } = req.params;

        await Favorites.findOneAndDelete({ userId, listingId });
        res.status(200).json({ message: "Removed from favorites" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const favorites = await Favorites.find({ userId }).populate('listingId');
        
        // Filter out null listings (in case a listing was deleted)
        const validFavorites = favorites.filter(f => f.listingId != null);
        res.status(200).json(validFavorites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
