const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateToken = require('../utils/GenerateToken');

// Step 1 — redirect to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

// Step 2 — Google redirects back here
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Issue your JWT just like normal login
    const token = generateToken(req.user);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Redirect based on role
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    if (req.user.role === 'seller') {
      res.redirect(`${frontendUrl}/dashboard/seller`);
    } else {
      res.redirect(`${frontendUrl}/dashboard/buyer`);
    }
  }
);

module.exports = router;