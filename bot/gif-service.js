var request = require('request');

var baseURL = 'http://api.giphy.com/'
var apiKey = process.env.API_KEY
var test = process.env.TEST_ENV

function getRandomGif(tags, callBack) {
  var url = baseURL + 'v1/gifs/random?api_key=' + apiKey + formattedGifTags(tags);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);

      callBack(gifBody(data.data.image_url));
    } else {
      console.log(error);
    }
  });
}

function formattedGifTags(tags) {
  var tagsString = '&tag=';
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    if (i == tags.length - 1) {
      tagsString = tagsString + tag;
    } else {
      tagsString = tagsString + tag + '+';
    }
  }

  return tagsString;
};

function gifBody(icon_url) {
  return {
    'response_type': 'in_channel',
    'attachments': [
      {
        'image_url': icon_url
      }
    ]
  };
};

module.exports = {
  formattedGifTags: formattedGifTags,
  gifBody: gifBody,
  getRandomGif: getRandomGif
}
