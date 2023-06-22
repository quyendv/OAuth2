import 'dotenv/config'; // must import dotenv config() here because in main file (index.js) import this file before run dotenv.config()
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      cb(null, profile);
    },
  ),
);

passport.serializeUser((user, cb) => {
  console.log('serialize', user);
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  console.log('deserialize', user);
  cb(null, user);
});
