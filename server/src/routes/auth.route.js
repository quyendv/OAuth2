import { Router } from 'express';
import passport from 'passport';

const router = Router();

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
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_LOCAL,
    failureRedirect: '/signin/failed',
  }),
);

export default router;
