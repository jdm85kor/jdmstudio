var express = require('express');
var router = express.Router();

/* facebook auth button */
router.get('/facebook',passport.authenticate('facebook'));

/* facebook auth callback */
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req,res) {
    res.redirect('/users');
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
  successRedirect: '/users',
  failureRedirect: '/'
}));

module.exports = router;