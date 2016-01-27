var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'JDMstudio'  	 				 
  });
router.get('/success', function(req, res) {
	console.log("log session");
	console.log(req.session);
	console.log("log user");
	console.log(req.user);
  	res.render('index', { title: 'JDMstudio'  	 				 
  });  	
});

module.exports = router;
