var express = require('express');
var router = express.Router();
var passport = require('passport');


app.get('/', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));


module.exports = router;
