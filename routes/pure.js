var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req,res,next){
  if(this.req.isAuthenticated()){
    return next();
  }
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
