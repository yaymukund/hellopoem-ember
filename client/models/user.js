App.User = DS.Model.extend({
  username: DS.attr('string'),
  poems: DS.hasMany('App.Poem'),
  lines: DS.hasMany('App.Line'),

  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
