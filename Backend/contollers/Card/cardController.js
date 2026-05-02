const Card = require('../../models/Card/card');

// GET /cards — get all cards for the logged-in user
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /cards — add a new card
exports.addCard = async (req, res) => {
  try {
    const { cardholderName, last4, brand, expiry } = req.body;
    if (!cardholderName || !last4 || !expiry) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // If this is first card, make it default
    const count = await Card.countDocuments({ userId: req.user.id });
    const isDefault = count === 0;

    const card = await Card.create({
      userId: req.user.id,
      cardholderName,
      last4: last4.slice(-4),
      brand: brand || 'Visa',
      expiry,
      isDefault
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /cards/:id — remove a card
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!card) return res.status(404).json({ error: 'Card not found' });

    // If deleted card was default, assign default to next card
    if (card.isDefault) {
      const next = await Card.findOne({ userId: req.user.id }).sort({ createdAt: 1 });
      if (next) { next.isDefault = true; await next.save(); }
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /cards/:id/default — set a card as default
exports.setDefault = async (req, res) => {
  try {
    await Card.updateMany({ userId: req.user.id }, { isDefault: false });
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isDefault: true },
      { new: true }
    );
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
