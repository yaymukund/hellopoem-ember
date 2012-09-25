App.User = DS.Model.extend({
  poems: DS.hasMany('App.Poem'),
  username: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
