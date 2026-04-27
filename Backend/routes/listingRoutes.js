const express = require('express');
const router  = express.Router();
const { createListing, getAllListings, getOneListing, updateListing, deleteListing }
  = require('../contollers/Listing/listingController');
const {isSeller} = require("../middlewares/User/isLoggedin")

router.get('/',        getAllListings);
router.get('/:id',     getOneListing);
router.post('/create', isSeller, createListing);    
router.put('/update/:id',      updateListing);    
router.delete('/delete/:id',   deleteListing);    

module.exports = router;