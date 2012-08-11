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
