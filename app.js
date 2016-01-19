var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var pkginfo = require('./package');


var routes = require('./routes/index');
var auth_login = require('.routes/auth_login');

var auth_facebook = require('./routes/auth_facebook');
var callback_facebook = require('./routes/callback_facebook');
var logout=require('./routes/logout');
var auth_google = require('./routes/auth_google');
var callback_google = require('./routes/callback_google');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user,done){
  console.log('serialize');
  done(null,user);
});

passport.deserializeUser(function(user,done){
  console.log('deserialize');
  done(null,user);
});

passport.use(new FacebookStrategy({
  clientID:pkginfo.oauth.facebook.FACEBOOK_APP_ID,
  clientSecret:pkginfo.oauth.facebook.FACEBOOK_APP_SECRET,
  callbackURL:pkginfo.oauth.facebook.callbackURL
  },
  function(accessToken,refreshToken,profile,done){
    console.log(profile);
    done(null,profile);
  }
));

passport.use(new GoogleStrategy({
    clientID:     pkginfo.oauth.google.client_id,
    clientSecret: pkginfo.oauth.google.client_secret,
    callbackURL:  pkginfo.oauth.google.redirect_uris,
    passReqToCallback   : false
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile); 
  }
));

var app = express();
//var router = express.Router();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

/*   Routing  Log in   */
app.use('/',routes);
app.use('/auth',auth_login);

//app.use('/auth/facebook',auth_facebook);
//app.use('/auth/facebook/callback',callback_facebook);
//app.use('/auth/google',auth_google);
//app.use('/auth/google/callback',callback_google);
app.use('/logout',logout);


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JDMstudio' });
});
*/
/* GET authenticate facebook 
router.get('/auth/facebook',passport.authenticate('facebook'));
*/
/* GET callback facebook 
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req,res) {
    res.redirect('/');
  });
*/
/* GET authenticate google 
router.get('/auth/google', 
  passport.authenticate('google', {
    scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));
*/
/* GET callback google 
router.get('/auth/google/callback',
 passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));
*/
/* GET logout button 
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err.status
  });
});


//app.use('/',router);


module.exports = app;
