App.Line = DS.Model.extend({
  user: DS.belongsTo('App.User'),
  text: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
