import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.use(passport.session()); // see more: https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045 -> same middleware verifyToken -> using as verifySession (call serializeUser & deserializeUser)

// ~ getInfo api
router.get('/signin/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Signing in successfully',
      user: req.user,
      // cookies: req.cookies,
    });
  }
});

router.get('/signin/failed', (req, res) => {
  res.status(401).json({ success: false, message: 'Signing in failed' });
});

router.get('/signout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(process.env.CLIENT_LOCAL);
  });
});

/** Google Auth */
router.get('/google', passport.authenticate('google', { scope: ['profile'] })); // [email, profile, openid] -> see note

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_LOCAL, // FIXME: update all -> check NODE_ENV -> using CLIENT_LOCAL/PRODUCT
    failureRedirect: '/signin/failed',
  }),
);

/** Github Auth */
router.get('/github', passport.authenticate('github', { scope: ['profile'] })); // ['user:email'] if need email additional -> see note

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: process.env.CLIENT_LOCAL,
    failureRedirect: '/signin/failed',
  }),
);

/** Facebook Auth */
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] })); // [email, public_profile] not "profile" as in video -> see note

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: process.env.CLIENT_LOCAL,
    failureRedirect: '/signin/failed',
  }),
);

export default router;
