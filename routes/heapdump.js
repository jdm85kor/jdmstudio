var express = require('express');
var router = express.Router();
var heapdump = require('heapdump');


var memoryLeak = [];
function LeakedObejct(){};


/* heapdump test page */
router.get('/', function(req, res,next) {
  	for(var i=0;i<1000;i++){
  	    memoryLeak.push(new LeakedObejct());
  	}
  	res.send('making momory leak. Current memory usage :'
  	         +(process.memoryUsage().rss / 1024 / 1024) + 'MB');
});

router.get('/heapdump',function(req,res,next){
    var filename = __dirname +'/heapdump/' + Date.now() + '.heapsnapshot';
    heapdump.writeSnapshot(filename);
    res.send('Heapdump has been generated in ' + filename);
});

module.exports = router;
