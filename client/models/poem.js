App.Poem = DS.Model.extend({
  title: DS.attr('string'),
  user: DS.belongsTo('App.User'),
  stanzas: DS.hasMany('App.Stanza', {key: 'stanza_ids'}),

  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  lines: function() {
    return this.get('stanzas').getEach('line');
  }.property('stanzas')
});

App.Poem.reopenClass({
  random: function() {
    jQuery.getJSON('/poems/random', function(data) {
      App.store.load('App.Poem', data.id, data);
    });
  }
});
