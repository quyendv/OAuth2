import 'dotenv/config'; // must import dotenv config() here because in main file (index.js) import this file before run dotenv.config()
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GithubStrategy } from 'passport-github2';
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

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    },
  ),
);

passport.serializeUser((user, cb) => {
  // console.log('serialize', user);
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  // console.log('deserialize', user);
  cb(null, user);
});
