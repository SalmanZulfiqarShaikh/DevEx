const Listing = require('../../models/Listing/listing');
const linkedList = require('../../utils/linkedList');

exports.getAdminListings = async (req, res) => {
    try {
        const listings = await Listing.find().populate('sellerId', 'name email profilePic');
        res.json(listings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.approveListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        if (!listing) return res.status(404).json({ error: 'Listing not found' });
        
        linkedList.updateById(req.params.id, { isApproved: true });
        
        res.json({ success: true, message: 'Listing approved', listing });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminDeleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) return res.status(404).json({ error: 'Listing not found' });
        
        linkedList.deleteById(req.params.id);
        res.json({ success: true, message: 'Listing deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
