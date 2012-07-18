require('ember/data');

module.exports = DS.Model.extend({
  user: DS.belongsTo('App.User'),
  stanzas: DS.hasMany('App.Stanza'),

  lines: function() {
    return this.get('stanzas').getEach('line');
  }.property('stanzas'),

  createdAt: DS.attr('date'),
  title: DS.attr('string')
});
