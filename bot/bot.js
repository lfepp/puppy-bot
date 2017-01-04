'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const gifService = require('./gif-service');

const morgan = require('morgan');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

const gifTags = ['cute', 'dog', 'adorable', 'puppy', 'puppies'];

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

app.listen(process.env.PORT || 9001);
