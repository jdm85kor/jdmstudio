var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var pkginfo = require('./package');
var auth_facebook = require('./routes/auth_facebook');
var auth_ok=require('./routes/auth_ok');
var logout=require('./routes/logout');

var passport = require('passport')
  , FacebookStrategy=require('passport-facebook').Strategy;

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

var app = express();

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


app.use('/', routes);
app.use('/users', users);
app.use('/auth/facebook',auth_facebook);
app.use('/auth/facebook/callback',auth_ok);
app.use('/logout',logout);

/*
app.get('/', function(req, res, next) {
  res.render('index', { title: 'JDMstudio' });
});
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callbackURL',
  passport.authenticate('facebook',{successRedirect:'/users',
    failureRedirect: '/'}));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JDMstudio auth ok' });
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
    error: {}
  });
});


module.exports = app;
