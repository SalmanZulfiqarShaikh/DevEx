const express = require('express');
const router = express.Router();
const { getMyPurchases, getMySales, mockPurchase } = require('../contollers/Purchases/purchaseController');
const { isLoggedIn, isBuyer, isSeller } = require('../middlewares/User/isLoggedin');

// Buyer route
router.get('/my', isLoggedIn, isBuyer, getMyPurchases);

// Seller route
router.get('/sales', isLoggedIn, isSeller, getMySales);

// Mock purchase (demo — replaces Stripe)
router.post('/mock', isLoggedIn, isBuyer, mockPurchase);

module.exports = router;
