var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req,res,next){
  console.log("^^^^^^^^^%%%%%%%%%%%");
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}


/* GET users page. */
router.get('/',ensureAuthenticated, function(req, res) {
	 	res.render('pure', { title: 'JDMstudio'
  						, user : req.user
  });
});

module.exports = router;
