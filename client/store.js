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
