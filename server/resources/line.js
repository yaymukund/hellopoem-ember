var Resource = require('ember-node-resources'),
    db = require('../db').connection(),
    callbacks = require('../callbacks');

module.exports = Resource.Controller.create({
  resourceName: 'line',
  timestamps: true,
  db: db,

  properties: {
    user_id: 'string',
    text: 'string'
  }
});
