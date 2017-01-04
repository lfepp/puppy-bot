'use strict';

const expect = require('chai').expect;
const gifService = require('../gif-service');

describe('gif-service', function() {
  it('should return formated gif tags', function() {
    const string = gifService.formattedGifTags(['test', 'test']);
    expect(string).to.equal('&tag=test+test');
  });

  it('should return formated gif body', function() {
    const body = gifService.gifBody('test_url');
    expect(body).to.deep.equal({
      response_type: 'in_channel',
      attachments: [
        {
          text: 'Cute puppies!',
          image_url: 'test_url',
        },
      ],
    });
  });
});
