require('ember/data');

module.exports = DS.Model.extend({
  user: DS.belongsTo('App.User'),

  createdAt: DS.attr('date'),
  text: DS.attr('string')
});
