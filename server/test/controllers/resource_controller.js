var request = require('supertest');
var app = require('./fake_app');

var _ = require('underscore');
var db = require('../../db').connection();
var Step = require('step');
var should = require('should');

describe('POST /resources', function() {
  var resource = {
    created_at: '2012-08-05T00:40:13.567Z',
    text: 'lolol'
  };

  var savedId;

  before(function(done) {
    Step(
      function performCreate() {
        request(app)
          .post('/resources')
          .send({resource: resource})
          .end(this);
      },

      function checkResponse(err, res) {
        should.not.exist(err);

        res.body.should.include(resource);
        res.body.should.have.property('id');

        savedId = res.body.id;
        done();
      }
    );
  });

  it('creates the resource', function(done) {
    Step(
      function searchForResource() {
        db.hgetall('resources:' + savedId, this);
      },

      function checkResponse(err, foundResource) {
        should.not.exist(err);
        foundResource.should.include(resource);
        done();
      }
    );
  });

  it('adds the ID to the list of resource IDs', function(done) {
    Step(
      function searchForId() {
        db.sismember('ids:resource', savedId, this);
      },

      function checkResults(err, exists) {
        should.not.exist(err);
        exists.should.equal(1);
        done();
      }
    );
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
    Step(
      function performFind() {
        request(app)
          .get('/resources/1')
          .end(this);
      },

      function checkResponse(err, res) {
        should.not.exist(err);
        _.pick(res.body, _.keys(resource))
          .should.eql(resource);
        done();
      }
    );
  });
});

describe('PUT /resources/:id', function() {
  var resource = {
    text: 'lolol',
    created_at: '2012-08-05T00:40:13.567Z'
  };

  var modifiedResource = _.clone(resource);
  modifiedResource.text = 'not lolol';

  before(function(done) {
    Step(
      function createResource() {
        db.hmset('resources:2', resource, this);
      },

      function performUpdate(err) {
        request(app)
        .put('/resources/2')
        .send({resource: modifiedResource})
        .end(this);
      },

      function setResult(err, res) {
        should.not.exist(err);
        done();
      }
    );
  });

  describe('the saved resource', function() {
    var savedResource;

    before(function(done) {
      Step(
        function getResource() {
          db.hgetall('resources:2', this);
        },

        function saveResource(err, theResource) {
          should.not.exist(err);
          savedResource = theResource;
          done();
        }
      );
    });

    it('contains the update', function() {
      _.pick(savedResource, _.keys(modifiedResource))
        .should.eql(modifiedResource);
    });
  });
});

describe('DELETE /resources/:id', function() {
  var resource = {
    text: 'lolol',
    created_at: '2012-08-05T00:40:13.567Z'
  };

  before(function(done) {
    Step(
      function createResource() {
        db.hmset('resources:3', resource, this.parallel());
        db.sadd('ids:resource', 3, this.parallel());
      },

      function performDestroy(err) {
        should.not.exist(err);
        request(app)
          .del('/resources/3')
          .end(this);
      },

      function checkResponse(err, res) {
        should.not.exist(err);
        done();
      }
    );
  });

  it('deletes the key', function(done) {
    Step(
      function searchForKey() {
        db.exists('resources:3', this);
      },

      function checkResult(err, exists) {
        should.not.exist(err);
        exists.should.equal(0);
        done();
      }
    );
  });

  it('removes the ID from the set of resource IDs', function(done) {
    Step(
      function searchForId() {
        db.sismember(3, 'ids:resource', this);
      },

      function checkResult(err, exists) {
        should.not.exist(err);
        exists.should.equal(0);
        done();
      }
    );
  });
});
