App.User = DS.Model.extend({
  poems: DS.hasMany('App.Poem'),

  createdAt: DS.attr('date'),
  username: DS.attr('string'),
  password: DS.attr('string')
});

App.User.reopenClass({
  url: '/lines/%@'
});
