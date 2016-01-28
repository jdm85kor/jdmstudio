var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var pkginfo = require('./package');

var index = require('./routes/index');
var auth_login = require('./routes/auth_login');
var users = require('./routes/users');
var logout = require('./routes/logout');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user,done){
  console.log('serialize');
  console.log(user);
  console.log('finish serialize');
  done(null,user);  
});

passport.deserializeUser(function(user,done){
  console.log('deserialize');
  done(null,user);
});

passport.use(new FacebookStrategy({
  clientID:pkginfo.oauth.facebook.FACEBOOK_APP_ID,
  clientSecret:pkginfo.oauth.facebook.FACEBOOK_APP_SECRET,
  callbackURL:pkginfo.oauth.facebook.callbackURL,
  enableProof: true
  },
  function(req, accessToken, refreshToken, profile, done){
    console.log(profile);
    console.log("facebook profile");
    done(null,profile);
  }
));

passport.use(new GoogleStrategy({
    clientID:     pkginfo.oauth.google.client_id,
    clientSecret: pkginfo.oauth.google.client_secret,
    callbackURL:  pkginfo.oauth.google.redirect_uris,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log("google profile");
    done(null, profile); 
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
//app.use(express.cookieParser());
//app.use(express.bodyParser());
app.use(express.session({ secret: 'express-jdm' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'jdm',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));


app.use('/',index);

/*   Routing  Log in   */
app.use('/auth',auth_login);
/*   Routing  Log out   */
app.use('/logout',logout);

/*   Routing User page   */
app.use('/users',users);


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

module.exports = app;
