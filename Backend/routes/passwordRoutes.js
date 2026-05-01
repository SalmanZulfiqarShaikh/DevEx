const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../services/auth');

// POST /auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const result = await forgotPassword(email);
        res.json(result);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// POST /auth/reset-password
router.post('/reset-password', async (req, res) => {
    try {
        const result = await resetPassword(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
