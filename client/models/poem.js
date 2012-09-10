App.Poem = DS.Model.extend({
  user: DS.belongsTo('App.User'),
  stanzas: DS.hasMany('App.Stanza'),

  lines: function() {
    return this.get('stanzas').getEach('line');
  }.property('stanzas'),

  createdAt: DS.attr('date'),
  title: DS.attr('string')
});

App.Poem.reopenClass({
  random: function() {
    jQuery.ajax({
      url: '/lines/random',
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
