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
