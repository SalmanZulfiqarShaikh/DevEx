const express = require('express');
const router  = express.Router();
const { createListing, getAllListings, getOneListing, updateListing, deleteListing }
  = require('../controllers/listingController');
const isLoggedin = require('../middlewares/User/isLoggedin'); 

router.get('/',        getAllListings);
router.get('/:id',     getOneListing);
router.post('/',       isLoggedin, createListing);    
router.put('/:id',     isLoggedin, updateListing);    
router.delete('/:id',  isLoggedin, deleteListing);    

module.exports = router;