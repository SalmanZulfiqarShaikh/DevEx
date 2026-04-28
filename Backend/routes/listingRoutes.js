const express = require('express');
const router  = express.Router();
const { createListing, getAllListings, getOneListing, updateListing, deleteListing }
  = require('../contollers/Listing/listingController');
const { isLoggedIn, isSeller } = require("../middlewares/User/isLoggedin")
const upload = require('../utils/multerConfig');

router.get('/',        getAllListings);
router.get('/:id',     getOneListing);
router.post('/create', isLoggedIn, isSeller, upload.array('images', 3), createListing);    
router.put('/update/:id',    isLoggedIn, isSeller, updateListing);    
router.delete('/delete/:id', isLoggedIn, isSeller, deleteListing);    

module.exports = router;