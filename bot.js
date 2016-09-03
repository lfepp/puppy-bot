var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

var format = ".json";
var apiKey = process.env.API_KEY

var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use port is set in the environment variable, or 9001 if it isn't set.
app.set('port', (process.env.PORT || 9001));

// for testing that the app is running
app.get('/', function(req, res) {
  res.send('Running!');
});

// app.post is triggered when a POST request is sent to the URL '/post'
app.post('/post', function(req, res) {
  cuteGif(function(body) {
    res.send(body);
  });
});

function cuteGif(callBack) {
  var url = 'http://api.giphy.com/v1/gifs/random?api_key=' + apiKey + '&tag=cute+dog+adorable';

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var icon_url = data.data.image_url;

      var body = {
        response_type: "in_channel",
        "attachments": [
          {
            "text": "Cute puppies!",
            "image_url": icon_url,
          }
        ]
      };

      callBack(body);
    }
  });
}

// tells Node which port to listen on
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
