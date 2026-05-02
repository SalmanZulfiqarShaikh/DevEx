const express = require('express');
const router = express.Router();
const { getCards, addCard, deleteCard, setDefault } = require('../contollers/Card/cardController');
const { isLoggedIn } = require('../middlewares/User/isLoggedin');

router.get('/', isLoggedIn, getCards);
router.post('/', isLoggedIn, addCard);
router.delete('/:id', isLoggedIn, deleteCard);
router.put('/:id/default', isLoggedIn, setDefault);

module.exports = router;
