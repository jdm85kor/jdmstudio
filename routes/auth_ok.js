var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */

console.log('abc');
router.get('/',
	passport.authenticate('facebook',{successRedirect:'/users',
		failureRedirect: '/'}));

module.exports = router;
