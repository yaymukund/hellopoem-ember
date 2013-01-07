App.Line = DS.Model.extend({
  text: DS.attr('string'),
  stanza: DS.belongsTo('App.Stanza'),
  line_number: DS.attr('number'),

  created_at: DS.attr('string'),
  updated_at: DS.attr('string')
});
