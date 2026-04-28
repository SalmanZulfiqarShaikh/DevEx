const express = require('express');
const router = express.Router();
const { getMyPurchases, getMySales } = require('../contollers/Purchases/purchaseController');
const { isLoggedIn, isBuyer, isSeller } = require('../middlewares/User/isLoggedin');

// Buyer route
router.get('/my', isLoggedIn, isBuyer, getMyPurchases);

// Seller route
router.get('/sales', isLoggedIn, isSeller, getMySales);

module.exports = router;
