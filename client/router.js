App.Router = Ember.Router.extend();

App.Router.map(function(match) {
  match('/').to('home');
});

App.HomeRoute = Ember.Route.extend({});
