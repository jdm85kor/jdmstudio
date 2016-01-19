var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/facebook',passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req,res) {
    res.redirect('/');
  });

router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));

router.get('/google/callback',
 passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

module.exports = router;
