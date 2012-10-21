App.Stanza = DS.Model.extend({
  poem: DS.belongsTo('App.Poem'),
  lines: DS.hasMany('App.Line', {key: 'line_ids'})
});
