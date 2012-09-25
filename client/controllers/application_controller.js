App.ApplicationController = Em.Controller.extend({
  connectRandomPoem: function() {
    this.connectOutlet('poem', App.Poem.random());
  }
});

App.ApplicationView = Em.View.extend({
  templateName: 'application'
});
