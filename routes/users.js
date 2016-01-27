var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res) {
	console.log("log session");
	console.log(req.session);
	console.log("log user");
	console.log(req.user);
  	res.render('users', { title: 'JDMstudio',	 				 
  						  user : req.session.passport.user
  });  	
});

module.exports = router;
