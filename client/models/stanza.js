App.Stanza = DS.Model.extend({
  lines: DS.hasMany('App.Line'),
  poems: DS.hasMany('App.Poem')
});
