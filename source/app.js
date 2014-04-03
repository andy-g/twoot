var	express = require('express');

var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/static'));

//app.get('/', function(req, res){ res.send(); });
app.get('/api/twoots/:twootId?', twoots);
app.post('/api/twoots/:twootId?', saveTwoot);

var stub = [
	{"text":"My first tweet!!!", "created":1396444920000},
	{"text":"Oh so original", "created":1396445220000}
]

function twoots(req, res) {
	var twootId = req.param('twootId');
	res.json(stub);
};


function saveTwoot(req, res) {
	var twoot = req.body;
	console.log(twoot);
	stub.push(twoot);
	res.json(twoot);
};

app.listen(3000);
console.log('Listening on 3000');