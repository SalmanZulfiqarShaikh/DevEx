const Listing = require('../../models/Listing/listing');
const linkedList = require('../../utils/linkedList');

exports.createListing = async (req, res) => {
    try {
        const { title, description, price, category, demoUrl } = req.body;
        const listing = await Listing.create({
            sellerId: req.user._id,
            title, description, price, category, demoUrl 
        });
        linkedList.prepend(listing);
        res.status(201).json(listing)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getAllListings = (req, res) => {
  const { q, min, max } = req.query;
  let results = linkedList.traverse();  // O(n) → Array

  if (q)   results = results.filter(l =>
    l.title.toLowerCase().includes(q.toLowerCase()) ||
    l.description.toLowerCase().includes(q.toLowerCase())
  );
  if (min) results = results.filter(l => l.price >= Number(min));
  if (max) results = results.filter(l => l.price <= Number(max));

  res.json(results);
}

exports.getOneListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user._id },
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
    const listing = await Listing.findOneAndDelete(
      { _id: req.params.id, sellerId: req.user._id }
    );
    if (!listing) return res.status(404).json({ error: 'Not found or not your listing' });
    linkedList.deleteById(req.params.id);  
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}