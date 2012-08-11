var request = require('supertest');
var app = require('./fake_app');
var _ = require('underscore');
var db = require('../../db').connection();

describe('POST /resources', function() {
  it('responds with an id', function(done) {
    var resource = {
      created_at: new Date(),
      text: 'lolol'
    };

    request(app)
      .post('/resources')
      .send({resource: resource})
      .end(function(err, res) {
        var keys = _.keys(resource);
        keys.push('id');
        res.body.should.have.keys(keys);
        done();
      });
  });
});

describe('GET /resources/:id', function() {
  var resource = {
    text: 'lolol',
    created_at: '2012-08-05T00:40:13.567Z'
  };

  before(function(done) {
    db.hmset('resources:1', resource, done);
  });

  it('responds with the resource', function(done) {
    request(app)
      .get('/resources/1')
      .end(function(err, res) {
        res.body.should.eql(resource);
        done();
      });
  });
});
