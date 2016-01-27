var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/',ensureAuthenticated, function(req, res) {
	
  	res.render('users', { title: 'JDMstudio',
  						  user : req.user
  });
});


module.exports = router;
