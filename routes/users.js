var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req,res,next){
  //if(req.isAuthenticated()){
    console.log("log session");
    console.log(req.session);
    console.log("log user");
    console.log(req);  
   // return next();
  //}
  res.redirect('/');
}


/* GET users page. */
router.get('/',ensureAuthenticated, function(req, res) {
	
  	res.render('users', { title: 'JDMstudio',
  						  user : req.session.passport.user
  });
});



//
module.exports = router;
