var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var gifService = require('./gif-service');

var gifTags = [ 'cute', 'dog', 'adorable', 'babies' ];

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

// for testing that the app is running
app.get('/', function(req, res) {
  res.send('PuppyBot is online.');
});

// app.post is triggered when a POST request is sent to the URL '/post'
app.post('/post', function(req, res) {
  gifService.getRandomGif(gifTags, function(body) {
    // needs to check for error and send if needed
    res.send(body);
  });
});

// add to helpers
function logger(req, res, next){
  console.log(new Date(), req.method, req.url);
  next();
}

app.listen(process.env.PORT || 9001);
