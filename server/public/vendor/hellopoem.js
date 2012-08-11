App = Em.Application.create();

// Utility functions.
var modelName = function(type) {
  // use the last part of the name as the URL
  var parts = type.toString().split(".");
  var name = parts[parts.length - 1];

  // Do some sanitization.
  return name.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
};

var modelRoot = function(type) {
  return '/' + modelName(type) + 's';
};

var makeUrl = function(type, id) {
  var root = modelRoot(type);

  if (id === null || id === undefined) {
    return root;

  } else {
    return root + '/' + id;
  }
};

var makeData = function(type, record) {
  var data = {};
  data[modelName(type)] = record.toJSON();
  return data;
};

// Adapter.
App.adapter = DS.Adapter.create({
  find: function(store, type, id) {
    var url = makeUrl(type, id);

    jQuery.getJSON(url, function(data) {
      store.load(type, id, data);
    });
  },

  createRecord: function(store, type, record) {
    var url = makeUrl(type);

    jQuery.ajax({
      url: url,
      data: makeData(type, record),
      dataType: 'json',
      type: 'POST',

      success: function(data) {
        store.didCreateRecord(record, data);
      }
    });
  },

  updateRecord: function(store, type, record) {
    var url = makeUrl(type, id);

    jQuery.ajax({
      url: url,
      data: makeData(type, record),
      dataType: 'json',
      type: 'PUT',

      success: function(data) {
        store.didUpdateRecord(record, data);
      }
    });
  },

  deleteRecord: function(store, type, record) {
    var url = makeUrl(type, id);

    jQuery.ajax({
      url: url,
      dataType: 'json',
      type: 'DELETE',

      success: function() {
        store.didDeleteRecord(record);
      }
    });
  }
});

// Attach the adapter to App.
App.store = DS.Store.create({
  revision: 4,
  adapter: App.adapter
});

App.Line = DS.Model.extend({
  user: DS.belongsTo('App.User'),

  createdAt: DS.attr('date'),
  text: DS.attr('string')
});

App.Poem = DS.Model.extend({
  user: DS.belongsTo('App.User'),
  stanzas: DS.hasMany('App.Stanza'),

  lines: function() {
    return this.get('stanzas').getEach('line');
  }.property('stanzas'),

  createdAt: DS.attr('date'),
  title: DS.attr('string')
});

App.Stanza = DS.Model.extend({
  lines: DS.hasMany('App.Line'),
  poems: DS.hasMany('App.Poem')
});

App.User = DS.Model.extend({
  poems: DS.hasMany('App.Poem'),

  createdAt: DS.attr('date'),
  username: DS.attr('string'),
  password: DS.attr('string')
});

App.ApplicationController = Em.Controller.extend();
App.ApplicationView = Em.View.extend({
  templateName: 'application'
});

App.HomeController = Em.Controller.extend({});
App.HomeView = Em.View.extend({
  templateName: 'home'
});

App.PoemController = Em.ObjectController.extend();

App.PoemView = Em.View.extend({
  templateName: 'poem',
  classNames: ['poem']
});

App.EditPoemField = Em.TextField.extend();

var router = Em.Router.create({
  enableLogging: true,
  location: 'hash',

  root: Em.Route.extend({
    home: Em.Route.extend({
      route: '/',
      connectOutlets: function(router, context) {
        var poem = {
          title: 'A poem.',
          lines: [{text: 'Roses are red'},
                  {text: 'Violets are blue'},
                  {text: 'Yay!'}],
          canEdit: true
        };

        router.get('applicationController').connectOutlet('poem', poem);
      }
    })
  })
});

App.initialize(router);
