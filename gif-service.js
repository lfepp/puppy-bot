var request = require('request');

var apiKey = process.env.API_KEY

module.exports.getGif = function(callBack) {
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
    } else {
      console.log("Response:" + response.statusCode);
    }
  });
}
