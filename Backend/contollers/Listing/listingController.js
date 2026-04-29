const Listing = require('../../models/Listing/listing');
const linkedList = require('../../utils/linkedList');

// Simple In-Memory Cache for Frequently Accessed Data
const detailsCache = new Map();

exports.createListing = async (req, res) => {
    try {
        const { title, description, longDescription, price, category, demoUrl } = req.body;
        const sellerId = req.user.id || req.user._id;

        // Collect uploaded images if present
        let images = [];
        if (req.files) {
            images = req.files.map(f => `http://localhost:3000/uploads/${f.filename}`);
        }

        const listing = await Listing.create({
            sellerId,
            title, 
            description, 
            longDescription,
            price, 
            category, 
            demoUrl,
            images: images.slice(0, 3) // Max 3
        });

        linkedList.prepend(listing);
        res.status(201).json(listing);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getAllListings = async (req, res) => {
  try {
    const { q, min, max, sellerId, category, sort } = req.query;
    let filter = { isApproved: true };
    
    if (sellerId) {
      filter = { sellerId };
    }

    let query = Listing.find(filter).populate('sellerId', 'name profilePic');

    let listings = await query;
    
    let results = listings.map(l => ({
      _id: l._id,
      shortId: l.shortId,
      title: l.title,
      description: l.description,
      longDescription: l.longDescription,
      price: l.price,
      category: l.category,
      images: l.images,
      demoUrl: l.demoUrl,
      clicks: l.clicks,
      sellerId: l.sellerId?._id,
      sellerName: l.sellerId?.name || 'Verified Founder',
      sellerProfilePic: l.sellerId?.profilePic,
      isApproved: l.isApproved,
      createdAt: l.createdAt
    }));

    if (q) {
      results = results.filter(l =>
        l.title.toLowerCase().includes(q.toLowerCase()) ||
        l.description.toLowerCase().includes(q.toLowerCase())
      );
    }
    if (min) results = results.filter(l => l.price >= Number(min));
    if (max) results = results.filter(l => l.price <= Number(max));
    if (sellerId) results = results.filter(l => l.sellerId && l.sellerId.toString() === sellerId.toString());
    if (category) results = results.filter(l => l.category && l.category.toLowerCase() === category.toLowerCase());

    // Handle Sort
    if (sort === 'a-z') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'popular') {
      results.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    } else if (sort === 'latest') {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getOneListing = async (req, res) => {
  try {
    const cacheKey = `listing_${req.params.id}`;
    let listing;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      listing = await Listing.findById(req.params.id).populate('sellerId', 'name profilePic');
    }
    if (!listing) {
      listing = await Listing.findOne({ shortId: req.params.id }).populate('sellerId', 'name profilePic');
    }
    if (!listing) return res.status(404).json({ error: 'Not found' });
    
    // Increment Click (popularity)
    listing.clicks = (listing.clicks || 0) + 1;
    await listing.save();
    
    // Sync with linked list if cached
    linkedList.updateById(req.params.id, { clicks: listing.clicks });

    // Cache the result
    detailsCache.set(cacheKey, { data: listing, timestamp: Date.now() });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const sellerId = req.user.id || req.user._id;
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, sellerId },
      req.body,
      { new: true }
    );
    if (!listing) return res.status(404).json({ error: 'Not found or not your listing' });
    linkedList.updateById(req.params.id, req.body);
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.deleteListing = async (req, res) => {
  try {
    const sellerId = req.user.id || req.user._id;
    const listing = await Listing.findOneAndDelete(
      { _id: req.params.id, sellerId }
    );
    if (!listing) return res.status(404).json({ error: 'Not found or not your listing' });
    linkedList.deleteById(req.params.id);  
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}