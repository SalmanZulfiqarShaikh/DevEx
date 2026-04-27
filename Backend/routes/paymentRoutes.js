const express = require('express');
const router  = express.Router();
const { enqueuePurchase, paymentSuccess } = require('../contollers/payment/paymentController');

router.post('/enqueue',  enqueuePurchase);  
router.get('/success',  paymentSuccess);    

module.exports = router;