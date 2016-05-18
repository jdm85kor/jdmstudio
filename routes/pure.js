var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}


/* GET users page. */
router.get('/',ensureAuthenticated(req,res,next()), function(req, res) {
//	console.log(req);
  	res.render('pure', { title: 'JDMstudio'
  						, user : req.user
  });
});

module.exports = router;
