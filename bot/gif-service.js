'use strict';

const request = require('request');
const baseURL = 'http://api.giphy.com/';
const apiKey = process.env.API_KEY;

// get random gif
function getRandomGif(tags, callBack) {
  const formattedTags = formattedGifTags(tags);
  const url = baseURL + 'v1/gifs/random?api_key=' + apiKey + formattedTags;

  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);

      callBack(gifBody(data.data.image_url));
    } else {
      // needs to send error via callBack
      console.log(error);
    }
  });
}

// format gif tags for request
function formattedGifTags(tags) {
  let tagsString = '&tag=';
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    if (i === tags.length - 1) {
      tagsString += tag;
    } else {
      tagsString = tagsString + tag + '+';
    }
  }

  return tagsString;
}

// create gif body for request
function gifBody(iconUrl) {
  return {
    response_type: 'in_channel',
    attachments: [
      {
        text: 'Cute puppies!',
        image_url: iconUrl,
      },
    ],
  };
}

// exports
module.exports = {
  formattedGifTags: formattedGifTags,
  gifBody: gifBody,
  getRandomGif: getRandomGif,
};
