var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    console.log("in if auth");
    return next();
  }
  console.log("out of if");
  res.redirect('/');
}


/* GET users page. */
router.get('/',ensureAuthenticated, function(req, res) {
//	console.log(req);
  	res.render('pure', { title: 'JDMstudio'
  						, user : req.user
  });
});

module.exports = router;
