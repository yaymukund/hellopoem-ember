App.PoemController = Em.ObjectController.extend();

App.PoemView = Em.View.extend({
  templateName: 'poem',
  classNames: ['poem']
});

App.EditPoemField = Em.TextField.extend();
