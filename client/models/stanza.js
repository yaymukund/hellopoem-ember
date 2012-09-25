App.Stanza = DS.Model.extend({
  poems: DS.belongsTo('App.Poem'),
  lines: DS.hasMany('App.Line')
});
