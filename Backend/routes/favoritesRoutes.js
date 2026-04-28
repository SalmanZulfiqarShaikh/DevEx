const express = require('express');
const router = express.Router();
const { addFavorite, removeFavorite, getFavorites } = require('../contollers/Favorites/favoritesController');
const { isLoggedIn } = require('../middlewares/User/isLoggedin');

router.get('/', isLoggedIn, getFavorites);
router.post('/', isLoggedIn, addFavorite);
router.delete('/:listingId', isLoggedIn, removeFavorite);

module.exports = router;
