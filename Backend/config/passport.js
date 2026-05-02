const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User/user');

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const googleName = profile.displayName || profile.name?.givenName || 'User';
    const googlePic  = profile.photos?.[0]?.value || null;

    // Already registered with Google — sync latest name/pic
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      user.name = googleName;
      if (googlePic) user.profilePic = googlePic;
      await user.save();
      return done(null, user);
    }

    // Email already registered manually — link Google + sync name & pic
    user = await User.findOne({ email: profile.emails[0].value });
    if (user) {
      user.googleId  = profile.id;
      user.name      = googleName;
      if (googlePic) user.profilePic = googlePic;
      await user.save();
      return done(null, user);
    }

    // Brand new user
    user = await User.create({
      name:       googleName,
      email:      profile.emails[0].value,
      googleId:   profile.id,
      profilePic: googlePic,
      role:       'buyer',
      isVerified: true,
    });

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport;