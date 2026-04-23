const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User/user');

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ googleId: profile.id });

    if (user) return done(null, user);

    // Check if email already registered manually
    user = await User.findOne({ email: profile.emails[0].value });
    if (user) {
      // Link Google ID to existing account
      user.googleId = profile.id;
      await user.save();
      return done(null, user);
    }

    // Brand new user — default role 'buyer', they can change later
    user = await User.create({
      name:     profile.displayName,
      email:    profile.emails[0].value,
      googleId: profile.id,
      role:     'buyer',
    });

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport;