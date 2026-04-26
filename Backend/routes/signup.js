const express = require('express');
const router = express.Router();
const { registerUser } = require('../services/auth');

router.post('/', async (req, res) => {
    try {
        const { token, user, role } = await registerUser(req.body);
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ success: true, user, role });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;