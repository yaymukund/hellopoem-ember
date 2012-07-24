App.adapter = DS.Adapter.create({
  find: function(store, type, id) {
    var url = App.get('baseUrl') + type.url.fmt(id);

    jQuery.getJSON(url, function(data) {
      store.load(type, id, data);
    });
  },

  createRecord: function(store, type, model) {
    var url = App.get('baseUrl') + type.url.fmt(model.get('id'));

    jQuery.ajax({
      url: url,
      data: model.get('data'),
      dataType: 'json',
      type: 'POST',

      success: function(data) {
        store.didCreateRecord(model, data);
      }
    });
  },

  updateRecord: function(store, type, model) {
    var url = App.get('baseUrl') + type.url.fmt(model.get('id'));

    jQuery.ajax({
      url: url,
      data: model.get('data'),
      dataType: 'json',
      type: 'PUT',

      success: function(data) {
        store.didUpdateRecord(model, data);
      }
    });
  },

  deleteRecord: function(store, type, model) {
    var url = App.get('baseUrl') + type.url.fmt(model.get('id'));

    jQuery.ajax({
      url: url,
      dataType: 'json',
      type: 'DELETE',

      success: function() {
        store.didDeleteRecord(model);
      }
    });
  }
});

// Attach the adapter to App.
App.store = DS.Store.create({
  revision: 4,
  adapter: App.adapter
});
