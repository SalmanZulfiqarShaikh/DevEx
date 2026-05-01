const Purchase = require('../../models/Purchases/purchases');
const Listing = require('../../models/Listing/listing');
const User = require('../../models/User/user');
const sendEmail = require('../../utils/sendEmail');

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
        const purchases = await Purchase.find().populate({
            path: 'listingId',
            match: { sellerId: req.user._id }
        }).sort({ createdAt: -1 });

        const mySales = purchases.filter(p => p.listingId != null);
        res.status(200).json(mySales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mock purchase — used for demo (replaces Stripe flow)
exports.mockPurchase = async (req, res) => {
    try {
        const { listingId } = req.body;

        const listing = await Listing.findById(listingId).populate('sellerId');
        if (!listing) return res.status(404).json({ error: 'Listing not found' });
        if (listing.isSold) return res.status(400).json({ error: 'This listing has already been sold' });

        const buyer = await User.findById(req.user._id);
        if (!buyer) return res.status(404).json({ error: 'Buyer not found' });

        // Check not already purchased
        const already = await Purchase.findOne({ buyerId: req.user._id, listingId });
        if (already) return res.status(400).json({ error: 'You have already purchased this listing' });

        // Record purchase
        await Purchase.create({
            buyerId: req.user._id,
            listingId: listing._id,
            amountPaid: listing.price,
        });

        // Mark listing as sold
        listing.isSold = true;
        listing.soldAt = new Date();
        await listing.save();

        const seller = listing.sellerId;
        const priceFormatted = `$${listing.price.toLocaleString()}`;

        // Email to buyer
        await sendEmail(buyer.email, `🎉 Purchase Confirmed — ${listing.title}`, `
            <p>Hey <strong>${buyer.name}</strong>,</p>
            <p>Your purchase of <strong>${listing.title}</strong> has been confirmed!</p>
            <table style="border-collapse:collapse;margin:16px 0;">
              <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px;">Product</td><td style="padding:6px 0;font-weight:bold;font-size:13px;">${listing.title}</td></tr>
              <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px;">Amount Paid</td><td style="padding:6px 0;font-weight:bold;font-size:13px;">${priceFormatted}</td></tr>
              <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px;">Category</td><td style="padding:6px 0;font-size:13px;">${listing.category}</td></tr>
            </table>
            <p>The seller will reach out to you shortly to complete the handover. You can also message them directly through the DevEx chat.</p>
            <br/>
            <p>Regards,<br/><strong>Team DevEx</strong><br/><em>Acquire the Future of Micro-SaaS.</em></p>
        `);

        // Email to seller
        if (seller?.email) {
            await sendEmail(seller.email, `💰 Your SaaS Was Sold — ${listing.title}`, `
                <p>Hey <strong>${seller.name}</strong>,</p>
                <p>Congratulations! Your listing <strong>${listing.title}</strong> has been sold on DevEx.</p>
                <table style="border-collapse:collapse;margin:16px 0;">
                  <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px;">Product</td><td style="padding:6px 0;font-weight:bold;font-size:13px;">${listing.title}</td></tr>
                  <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px;">Sale Price</td><td style="padding:6px 0;font-weight:bold;font-size:13px;">${priceFormatted}</td></tr>
                  <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px;">Buyer</td><td style="padding:6px 0;font-size:13px;">${buyer.name}</td></tr>
                </table>
                <p>Please reach out to the buyer through DevEx chat to complete the handover process.</p>
                <br/>
                <p>Regards,<br/><strong>Team DevEx</strong><br/><em>Acquire the Future of Micro-SaaS.</em></p>
            `);
        }

        res.status(200).json({ success: true, message: 'Purchase completed successfully' });
    } catch (err) {
        console.error('Mock purchase error:', err.message);
        res.status(500).json({ error: err.message });
    }
};
