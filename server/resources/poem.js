var Resource = require('ember-node-resources'),
    db = require('../db').connection(),
    callbacks = require('../callbacks');

module.exports = Resource.Controller.create({
  resourceName: 'poem',
  db: db,
  timestamps: true,

  properties: [
    'title',
    'user_id'
  ],

  actions: [{
    name: 'random',
    type: 'collection',
    method: 'GET',
    callbacks: [
      callbacks.randomId,
      Resource.Callbacks.show,
      Resource.Callbacks.respond
    ]
  }]
});
