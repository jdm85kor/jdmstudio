var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/',passport.authenticate('facebook'));


module.exports = router;
