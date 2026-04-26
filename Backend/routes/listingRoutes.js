const express = require('express');
const router  = express.Router();
const { createListing, getAllListings, getOneListing, updateListing, deleteListing }
  = require('../contollers/Listing/listingController');
const { isLoggedIn } = require('../middlewares/User/isLoggedin'); 

router.get('/',        getAllListings);
router.get('/:id',     getOneListing);
router.post('/create',       isLoggedIn, createListing);    
router.put('/update/:id',     isLoggedIn, updateListing);    
router.delete('/delete/:id',  isLoggedIn, deleteListing);    

module.exports = router;