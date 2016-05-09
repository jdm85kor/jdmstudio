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
router.get('/',ensureAuthenticated, function(req, res) {
//	console.log(req);
  	res.render('list', { title: 'JDMstudio'
  						, user : req.user
  });
});

module.exports = router;
