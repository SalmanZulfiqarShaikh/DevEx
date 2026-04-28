const queue    = require('../../utils/Queue');
const Purchase = require('../../models/Purchases/purchases');
const Listing  = require('../../models/Listing/listing');
const stripe   = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

exports.enqueuePurchase = async (req, res) => {
  try {
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId).populate('sellerId');
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const seller = listing.sellerId;
    if (!seller.stripeAccountId) {
      return res.status(400).json({ error: 'Seller has not connected their Stripe account yet' });
    }

    const already = await Purchase.findOne({
      buyerId:   req.user._id,
      listingId: listingId
    });
    if (already) {
      return res.status(400).json({ error: 'Already purchased' });
    }

    const totalAmount    = listing.price;                   // in cents
    const platformFee    = Math.round(totalAmount * 0.10);  // 10% platform cut
    const sellerPayout   = totalAmount - platformFee;       // 90% to seller

    const job = {
      buyerId:          req.user._id.toString(),
      listingId:        listing._id.toString(),
      sellerId:         seller._id.toString(),
      sellerStripeAcct: seller.stripeAccountId,
      title:            listing.title,
      description:      listing.description,
      price:            totalAmount,
      platformFee:      platformFee,
      sellerPayout:     sellerPayout,
      timestamp:        Date.now()
    };
    queue.enqueue(job);

    const toProcess = queue.dequeue();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      line_items: [
        {
          price_data: {
            currency:    'usd',
            unit_amount: toProcess.price,
            product_data: {
              name:        toProcess.title,
              description: toProcess.description,
            },
          },
          quantity: 1,
        },
      ],

      mode: 'payment',

      payment_intent_data: {
        // 10% goes to your platform automatically
        application_fee_amount: toProcess.platformFee,

        // 90% transferred to seller's Stripe account
        transfer_data: {
          destination: toProcess.sellerStripeAcct,
        },
      },

      metadata: {
        buyerId:      toProcess.buyerId,
        listingId:    toProcess.listingId,
        sellerId:     toProcess.sellerId,
        platformFee:  toProcess.platformFee.toString(),
        sellerPayout: toProcess.sellerPayout.toString(),
      },

      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.CLIENT_URL}/listings/${toProcess.listingId}`,
    });

    console.log('Stripe Connect session created:', session.id);

    res.status(200).json({
      message:    'Purchase job processed',
      sessionUrl: session.url,
      sessionId:  session.id,
      breakdown: {
        total:        `$${(totalAmount    / 100).toFixed(2)}`,
        platformFee:  `$${(platformFee   / 100).toFixed(2)}`,
        sellerPayout: `$${(sellerPayout  / 100).toFixed(2)}`,
      }
    });

  } catch (err) {
    console.error('Payment queue error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    await Purchase.create({
      buyerId:         session.metadata.buyerId,
      listingId:       session.metadata.listingId,
      stripeSessionId: session.id,
      amountPaid:      session.amount_total,
    });

    res.json({ message: 'Purchase recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};