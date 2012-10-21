var util = {
  constants: {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },

  pad: function(num) {
    return (num < 10) ? '0' + num : num.toString();
  },

  dateToString: function(date) {
    if (date == undefined) {
      return undefined;
    }

    if (!(date instanceof Date)) {
      return null;
    }

    var utcYear = date.getUTCFullYear(),
        month = this.constants.months[date.getUTCMonth()],
        dayOfMonth = this.pad(date.getUTCDate()),
        dayOfWeek = this.constants.days[date.getUTCDay()],
        utcHours = this.pad(date.getUTCHours()),
        utcMinutes = this.pad(date.getUTCMinutes()),
        utcSeconds = this.pad(date.getUTCSeconds());

    return dayOfWeek + ', '
         + dayOfMonth + ' '
         + month + ' '
         + utcYear + ' '
         + utcHours + ':'
         + utcMinutes + ':'
         + utcSeconds + ' GMT';
  },

  stringToDate: function(serialized) {
    var type = typeof serialized;

    if (type === 'string' || type === 'number') {
      return new Date(serialized);
    }

    if (serialized === null || serialized === undefined) {
      // if the value is not present in the data,
      // return undefined, not null.
      return undefined;
    }

    return null;
  }
};

// Make this usable on the server as well as the client!
if (typeof module != 'undefined' && module.exports) {
  module.exports = util;
};

App = Em.Application.create();

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

App.Poem = DS.Model.extend({
  title: DS.attr('string'),
  user: DS.belongsTo('App.User'),
  stanzas: DS.hasMany('App.Stanza', {key: 'stanza_ids'}),

  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  lines: function() {
    return this.get('stanzas').getEach('line');
  }.property('stanzas')
});

App.Poem.reopenClass({
  random: function() {
    jQuery.getJSON('/poems/random', function(data) {
      App.store.load('App.Poem', data.id, data);
    });
  }
});

App.Stanza = DS.Model.extend({
  poem: DS.belongsTo('App.Poem'),
  lines: DS.hasMany('App.Line', {key: 'line_ids'})
});

App.User = DS.Model.extend({
  username: DS.attr('string'),
  poems: DS.hasMany('App.Poem'),
  lines: DS.hasMany('App.Line'),

  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});

// Adapter.
App.Adapter = DS.RESTAdapter;

// Create the adapter.
App.adapter = App.Adapter.create({ bulkCommit: false });

// Transforms for serializing different types.
App.adapter.registerTransform('date', {
  fromJSON: util.stringToDate.bind(util),
  toJSON: util.dateToString.bind(util)
});

// Attach the adapter to App.
App.store = DS.Store.extend({
  revision: 6,
  adapter: App.adapter
});

App.ApplicationController = Em.Controller.extend({
  connectRandomPoem: function() {
    this.connectOutlet('poem', App.Poem.random());
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

var router = Em.Router.create({
  enableLogging: true,
  location: 'hash',

  root: Em.Route.extend({
    home: Em.Route.extend({
      route: '/',
      connectOutlets: function(router, context) {
        router.get('applicationController').connectRandomPoem();
      }
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