var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var pkginfo = require('./package');

// MongoDB
var MongoClient = require('mongodb').MongoClient;
//var MongoServer = require('mongodb').Server;
var dbUrl = 'mongodb://jdm:smspeed1@ds013599.mlab.com:13599/heroku_0tlc86rm';



// Web page RESTapi
var index = require('./routes/index');
var auth_login = require('./routes/auth_login');
var users = require('./routes/users');
var logout = require('./routes/logout');

/*  test page   */
var test = require('./routes/test');
var dump = require('./routes/heapdump');
var pure = require('./routes/pure');
var list = require('./routes/list');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new FacebookStrategy({
  clientID:pkginfo.oauth.facebook.FACEBOOK_APP_ID,
  clientSecret:pkginfo.oauth.facebook.FACEBOOK_APP_SECRET,
  callbackURL:pkginfo.oauth.facebook.callbackURL,
  passReqToCallback   : true
  },
  function(req,accessToken, refreshToken, profile, done){
    console.log("in app.js req = " + req);
    done(null,profile);
    console.log("in app.js after done(null,profile) req = " + req);
  }
));

passport.use(new GoogleStrategy({
    clientID:     pkginfo.oauth.google.client_id,
    clientSecret: pkginfo.oauth.google.client_secret,
    callbackURL:  pkginfo.oauth.google.redirect_uris,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log("req = " + req);
    done(null, profile); 
  }
));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use( express.static(path.join(__dirname, 'public')) );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session( {
     store: new RedisStore( {
        host: 'ec2-54-217-206-114.eu-west-1.compute.amazonaws.com',
        port: 12479,
        password: 'pc7egvk4ocuk596hioafm855mem',
        url: 'redis://h:pc7egvk4ocuk596hioafm855mem@ec2-54-217-206-114.eu-west-1.compute.amazonaws.com:12479'
     }),
     secret: 'jdm'
     }
));

passport.serializeUser(function(user,done){
  console.log("serializeUser");
  console.log(user.displayName);
  done(null,user.displayName);
  console.log("after done() serializeUser");
});

// passport.deserializeUser(function(user, done) {
//   console.log("deserializeUser");
//   done(null, user);
// });
passport.deserializeUser(function(user, req, done) {
  console.log("deserializeUser");
  console.log(user.displayName);
  done(null, user);
});

console.log("passport.initialize()");
app.use( passport.initialize() );
console.log("passport.session()");
app.use( passport.session() );


MongoClient.connect(dbUrl,function(err,db){
  console.log("Connected correctly to server.");
  db.close();
});


// var mongoclient = new MongoClient(new MongoServer('mongodb://jdm:smspeed1@ds013599.mlab.com:13599/heroku_0tlc86rm',
//                                                   27017,
//                                                   {'native_parser':true}));
// var db = mongoclient.db('db');


app.use('/',index);

/*   Routing  Log in   */
app.use('/auth',auth_login);
/*   Routing  Log out   */
app.use('/logout',logout);

/*   Routing User page   */
app.use('/users',users);

/*    Routing Test page   */
app.use('/test',test);

/**    Routing Test heapdump page
*      /leak , /leak/heapdump      
*/
app.use('/pure',pure);

app.use('/list',list);


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
