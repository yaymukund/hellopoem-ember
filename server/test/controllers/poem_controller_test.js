var request = require('supertest'),
    app = require('../../../server/start')('development'),
    db = require('../../db').connection(),
    _ = require('underscore'),
    should = require('should');

describe('GET /poems/random', function() {
  // Need to add at least one resource.
  var resource = {
    id: 1,
    text: 'lolol',
    created_at: '2012-08-05T00:40:13.567Z'
  };

  // We're not guaranteed to get this poem, but it ensures that there's SOME
  // data to retrieve.
  before(function(done) {
    db.multi()
      .hmset('poems:1', resource)
      .sadd('ids:poem', '1')
      .exec(done);
  });

  it('responds with any resource', function(done) {
    request(app)
      .get('/poems/random')
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.property('id');
        done();
      });
  });
});
