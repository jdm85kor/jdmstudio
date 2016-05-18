var express = require('express');
var router = express.Router();
var passport = require('passport');

/* facebook auth button */
router.get('/facebook',passport.authenticate('facebook'));

/* facebook auth callback */
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req,res) {
    res.redirect('/pure');
  }
);

/* google auth button */
router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));

/* callback auth callback */
router.get('/google/callback',
 passport.authenticate('google', {
  successRedirect: '/pure',
  failureRedirect: '/'
}));

// /* wechat auth button */
// router.get('/wechat',passport.authenticate('wechat')
//            ,function(req,res){
//                console.log("abcdfef%$$$$$$$$%#$%#$%@#$");
// });

// /* wechat auth callback */
// router.get('/wechat/callback',
//   passport.authenticate('wechat', { 
//     failureRedirect: '/',
//     successRedirect: '/pure'
// }));



module.exports = router;