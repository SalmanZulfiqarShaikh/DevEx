const express = require('express');
const router  = express.Router();
const { createListing, getAllListings, getOneListing, updateListing, deleteListing }
  = require('../controllers/listingController');
const isLoggedin = require('../middlewares/User/isLoggedin'); 

router.get('/',        getAllListings);
router.get('/:id',     getOneListing);
router.post('/create',       isLoggedin, createListing);    
router.put('/update/:id',     isLoggedin, updateListing);    
router.delete('/delete/:id',  isLoggedin, deleteListing);    

module.exports = router;