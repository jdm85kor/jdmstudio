var express = require('express');
var router = express.Router();
var passport = require('passport');

console.log("********************************callback_google.js*****************************")

router.get('/', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));


module.exports = router;