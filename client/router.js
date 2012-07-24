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
                  {text: 'OH MY GOD I AM BLEEDING'}],
          canEdit: true
        };

        router.get('applicationController').connectOutlet('poem', poem);
      }
    })
  })
});

App.initialize(router);
