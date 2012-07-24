App.Line = DS.Model.extend({
  user: DS.belongsTo('App.User'),

  createdAt: DS.attr('date'),
  text: DS.attr('string')
});

App.Line.reopenClass({
  url: '/lines/%@'
});
