var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/',ensureAuthenticated, function(req, res) {
	
  	res.render('users', { title: 'JDMstudio',
  						  user : req.user
  });
});

function ensureAuthenticated(req,res,next){
  //if(req.isAuthenticated()){
    console.log("log session");
    console.log(req.session);
    console.log("log user");
    console.log(req.user);  
  //  return next();
  //}
  res.redirect('/');
}

//
module.exports = router;
