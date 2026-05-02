const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateToken = require('../utils/GenerateToken');
const { isLoggedIn } = require('../middlewares/User/isLoggedin');
const User = require('../models/User/user');

// Step 1 — redirect to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

// Step 2 — Google redirects back here
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user);

    // Also set cookie for same-origin requests
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const envUrl = process.env.FRONTEND_URL;
    const frontendUrl = envUrl && envUrl.startsWith('http') ? envUrl : 'http://localhost:5173';

    // Pass token + user data as URL params so frontend can store in localStorage
    const userPayload = encodeURIComponent(JSON.stringify({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      profilePic: req.user.profilePic || null,
      isVerified: req.user.isVerified
    }));

    res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${userPayload}&role=${req.user.role}`);
  }
);

// GET /auth/me — called on frontend mount to hydrate auth state from cookie
router.get('/me', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id).select('-passwordHash -otp -otpExpiresAt');
    if (!user) return res.status(404).json({ success: false });
    res.json({ success: true, user, role: user.role });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;