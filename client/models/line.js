App.Line = DS.Model.extend({
  text: DS.attr('string'),

  created_at: DS.attr('string'),
  updated_at: DS.attr('string')
});

DS.RESTAdapter.map('App.Line', {
  text: {key: 'text'},

  created_at: {key: 'created_at'},
  updated_at: {key: 'updated_at'}
});
