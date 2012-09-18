var Resource = require('ember-node-resources'),
    db = require('../db').connection(),
    callbacks = require('../callbacks');

module.exports = Resource.Controller.create({
  resourceName: 'line',
  db: db,

  properties: [
    'text',
    'created_at'
  ]
});
