const express = require('express');
const router  = express.Router();
const { getAdminListings, approveListing, adminDeleteListing } = require('../contollers/Admin/adminController');
const { isLoggedIn, isAdmin } = require("../middlewares/User/isLoggedin");

router.get('/listings', isLoggedIn, isAdmin, getAdminListings);
router.put('/listings/:id/approve', isLoggedIn, isAdmin, approveListing);
router.delete('/listings/:id', isLoggedIn, isAdmin, adminDeleteListing);

module.exports = router;
