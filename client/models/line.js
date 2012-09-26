App.Line = DS.Model.extend({
  user: DS.belongsTo('App.User'),
  stanza: DS.belongsTo('App.Stanza'),
  text: DS.attr('string'),

  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
