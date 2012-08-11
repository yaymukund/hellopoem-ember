var _ = require('underscore');
var Step = require('step');
var db = require('../db').connection();

exports.create = function(options) {

  _.defaults(options, {
    basePath: '/' + options.name + 's'
  });

  var paths = {
    create: options.basePath,
    show: options.basePath + '/:id',
    update: options.basePath + '/:id',
    destroy: options.basePath + '/:id'
  };

  var resource = {};

  resource.create = function(req, res) {
    var props = req.body[options.name];
    props = _.pick(props, _.keys(options.properties));

    Step(
      function getId() {
        db.incr(options.name + ':id', this);
      },

      function createResource(err, id) {
        if (err) { throw err; }

        props.id = id;
        var key = options.name + 's:' + id;

        db.hmset(key, props, this.parallel());
        db.sadd('ids:' + options.name, id, this.parallel());

        return id;
      },

      function respond(err, id) {
        if (err) {
          res.json(500, {error: err.message});
          return;
        }

        res.json(props);
      }
    );
  };

  resource.show = function(req, res) {
    var key = options.name + 's:' + req.params.id;

    Step(
      function getResource() {
        db.hgetall(key, this);
      },

      function respond(err, savedResource) {
        if (err) {
          res.json(500, {error: err.message});
          return;
        }

        res.json(savedResource);
      }
    );
  };

  resource.update = function(req, res) {
    var key = options.name + 's:' + req.params.id;

    Step(
      function getResource() {
        db.hmset(key, req.body[options.name], this);
      },

      function respond(err, savedResource) {
        if (err) {
          res.json(500, {error: err.message});
          return;
        }

        res.json(req.body[options.name]);
      }
    );
  };

  resource.destroy = function(req, res) {
    var key = options.name + 's:' + req.params.id;

    Step(
      function destroyResource() {
        db.del(key, this.parallel());
        db.srem(ids + 's:' + options.name, req.params.id, this.parallel());
      },

      function respond(err) {
        if (err) {
          res.json(500, {error: err.message});
          return;
        }

        res.send(200);
      }
    );
  };

  resource.initialize = function(app) {
    app.post(paths.create, resource.create);
    app.get(paths.show, resource.show);
    app.put(paths.update, resource.update);
    app.delete(paths.destroy, resource.destroy);
  };

  return resource;
};
