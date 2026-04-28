const express = require('express');
const router = express.Router();
const { getChatHistory, getChatContacts, sendMessage, getUnreadCount } = require('../contollers/Chat/chatController');
const { isLoggedIn } = require('../middlewares/User/isLoggedin');

router.get('/unread-count', isLoggedIn, getUnreadCount);
router.get('/history/:otherUserId', isLoggedIn, getChatHistory);
router.get('/contacts', isLoggedIn, getChatContacts);
router.post('/message', isLoggedIn, sendMessage);

module.exports = router;
