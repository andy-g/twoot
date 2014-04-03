var	express = require('express');

var redis = require("redis");
//For Heroku
var logfmt = require("logfmt");
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);
app.use(logfmt.requestLogger());

//local
//var client = redis.createClient();

client.retry_max_delay = 5000;

client.on("error", function (err) {
	console.log("Error " + err);
});

const user = 'user1234';

var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/static'));

//app.get('/', function(req, res){ res.send(); });
app.get('/api/twoots/:twootId?', twoots);
app.post('/api/twoots/:twootId?', saveTwoot);


function twoots(req, res) {
	var twootId = req.param('twootId');
	client.lrange(user, 0, 50, function(err, arr){ 
		if (!arr)
			res.json([]);
		else{
			var parsed_arr = arr.map(function(item){
				return JSON.parse(item);
			})
			res.json(parsed_arr)
		}
	});
};


function saveTwoot(req, res) {
	var twoot = req.body;
	twoot.status = 1;
	console.log(twoot);
	client.lpush(user, JSON.stringify(twoot), function(error, data){
		if (!!error){
			console.dir(error);
			res.json(500, {"error" : "There was an error sending your tweet, please retry later."});
		}else{
			console.dir(data);
	res.json(twoot);
		}
	});
};

// app.listen(3000);
// console.log('Listening on 3000');

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});