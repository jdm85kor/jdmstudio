var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.session.user);
  	res.render('index', { title: 'JDMstudio'  	 				 
  });
 });

module.exports = router;
