App.Poem = DS.Model.extend({
  title: DS.attr('string'),
  user: DS.belongsTo('App.User'),
  stanzas: DS.hasMany('App.Stanza'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  lines: function() {
    return this.get('stanzas').getEach('line');
  }.property('stanzas')
});

App.Poem.reopenClass({
  random: function() {
    jQuery.ajax({
      url: '/poems/random',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log('received data');
        console.log(data);
        App.store.load('App.Poem', data.id, data);
      }
    });
  }
});
