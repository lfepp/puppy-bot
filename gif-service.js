var request = require('request');

var baseURL = 'http://api.giphy.com/'
var apiKey = process.env.API_KEY

module.exports.getRandomGif = function(callBack) {
  var url = baseURL + 'v1/gifs/random?api_key=' + apiKey + '&tag=cute+dog+adorable';

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      
      callBack(gifBody(data.data.image_url));
    }
  });
}

function gifBody(icon_url) {
  return {
    response_type: "in_channel",
    "attachments": [
      {
        "image_url": icon_url
      }
    ]
  };
}
