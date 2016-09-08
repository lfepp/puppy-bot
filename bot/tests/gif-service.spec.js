var expect = require('chai').expect;
var gifService = require('../gif-service');

describe('gif-service', function() {
  it('should return formated gif tags', function() {
    var string = gifService.formattedGifTags(['test', 'test']);
    expect(string).to.equal('&tag=test+test');
  });

  it('should return formated gif body', function() {
    var body = gifService.gifBody('test_url');
    expect(body).to.deep.equal({
      response_type: 'in_channel',
      'attachments': [
        {
          'text': 'Cute puppies!',
          'image_url': 'test_url'
        }
      ]
    });
  });
});
