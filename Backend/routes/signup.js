const express = require('express');
const router = express.Router();
const { registerUser, verifySignup } = require('../services/auth');

router.post('/', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        // We do not return the token here anymore. We just return success: true and the email.
        res.json(result);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { token, user, role } = await verifySignup(req.body);
        // After successful OTP verification, we grant the cookie and log the user in
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ success: true, user, role });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;