const express = require('express');
const router = express.Router();
const { clearStack } = require('../utils/stack');

router.post('/logout', (req, res) => {
    const userId = req.user?.id;
    if (userId) clearStack(userId);
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out' });
});

module.exports = router;