var express = require('express');
var router = express.Router();

/* GET Logout. */
router.get('/', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
