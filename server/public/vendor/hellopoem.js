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

App.Poem.reopenClass({
  random: function() {
    jQuery.ajax({
      url: '/lines/random',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log('received data');
        console.log(data);
        App.store.load('App.Poem', data.id, data);
      }
    });
  }
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

App.ApplicationController = Em.Controller.extend({
  connectRandomPoem: function() {
    this.connectOutlet('poem', {
      title: 'A poem.',
      lines: [{text: 'Roses are red'},
              {text: 'Violets are blue'},
              {text: 'Yay!'}],
      canEdit: true
    });
  }
});

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

  random: function(store, type) {
    jQuery.ajax({});
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
    var url = makeUrl(type, record.get('id'));

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
    var url = makeUrl(type, record.get('id'));

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

var router = Em.Router.create({
  enableLogging: true,
  location: 'hash',

  root: Em.Route.extend({
    home: Em.Route.extend({
      route: '/',
      connectOutlets: router.get('applicationController').connectRandomPoem
    })
  })
});

App.initialize(router);

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, stack4, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  data.buffer.push("<h1>My Ember Application</h1>\n");
  stack1 = depth0;
  stack2 = "outlet";
  stack3 = {};
  stack4 = "true";
  stack3['escaped'] = stack4;
  stack4 = helpers._triageMustache || depth0._triageMustache;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "_triageMustache", stack2, tmp1); }
  else { stack1 = stack4; }
  data.buffer.push(escapeExpression(stack1) + "\n");
  return buffer;
});
Ember.TEMPLATES["home"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var self=this;


  data.buffer.push("Hi everybody!\n");
});
Ember.TEMPLATES["poem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3, stack4;
  data.buffer.push("\n<div class=\"line\">");
  stack1 = depth0;
  stack2 = "text";
  stack3 = {};
  stack4 = "true";
  stack3['escaped'] = stack4;
  stack4 = helpers._triageMustache || depth0._triageMustache;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "_triageMustache", stack2, tmp1); }
  else { stack1 = stack4; }
  data.buffer.push(escapeExpression(stack1) + "</div>\n");
  return buffer;}

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3;
  data.buffer.push("\n");
  stack1 = depth0;
  stack2 = "App.EditPoemField";
  stack3 = helpers.view || depth0.view;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "view", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n");
  return buffer;}

  stack1 = depth0;
  stack2 = "lines";
  stack3 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "canEdit";
  stack3 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});