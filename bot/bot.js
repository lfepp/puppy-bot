var express = require('express');
var bodyParser = require('body-parser');
var gifService = require('./gif-service');

var morgan = require('morgan')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))

var gifTags = [ 'cute', 'dog', 'adorable' ];

// for testing that the app is running
app.get('/', function(req, res) {
  res.send('PuppyBot is online.');
});

// app.post is triggered when a POST request is sent to the URL '/post'
app.post('/post', function(req, res) {
  gifService.getRandomGif(gifTags, function(body) {
    // res.statusCode = statusCode;
    res.send(body);
  });
});

app.listen(process.env.PORT || 9001);
