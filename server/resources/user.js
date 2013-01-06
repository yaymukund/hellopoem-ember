var Resource = require('ember-node-resources'),
    db = require('../db').connection(),
    callbacks = require('../callbacks');

module.exports = Resource.Controller.create({
  resourceName: 'user',
  db: db,
  timestamps: true,

  properties: {
    username: 'string'
  }
});
