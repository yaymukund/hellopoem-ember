var Resource = require('ember-node-resources'),
    db = require('../db').connection(),
    callbacks = require('../callbacks');

module.exports = Resource.Controller.create({
  resourceName: 'stanza',
  db: db,

  properties: {
    poem_id: 'string',
    lines: 'array'
  }
});
