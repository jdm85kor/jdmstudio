var express = require('express');
var router = express.Router();
var passport = require('passport');

/* facebook auth button */
router.get('/facebook',passport.authenticate('facebook'));

/* facebook auth callback */
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req,res) {
    res.redirect('/jdm');
  });

/* google auth button */
router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));

/* callback auth callback */
router.get('/google/callback',
 passport.authenticate('google', {
  successRedirect: '/jdm',
  failureRedirect: '/'
}));

module.exports = router;