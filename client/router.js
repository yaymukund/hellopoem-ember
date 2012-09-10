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
