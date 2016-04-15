var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

/* Insert username into DB  */
var insertUsername = function(db,user,callback){
  db.collection('db').insertOne({
    "username": user
    }, function(err,result){
      console.log('Insert username that login this web');
      callback();
    });
};

/* GET users page. */
router.get('/',ensureAuthenticated, function(req, res) {
//	console.log(req);
  	res.render('users', { title: 'JDMstudio'
  						, user : req.user
  });
  
});

//
module.exports = router;
