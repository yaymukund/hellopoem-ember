// Create the adapter.
App.adapter = DS.RESTAdapter.create({ bulkCommit: false });

// Transforms for serializing different types.
App.adapter.registerTransform('date', {
  deserialize: App.Util.stringToDate.bind(App.Util),
  serialize: App.Util.dateToString.bind(App.Util)
});

// Attach the adapter to App.
App.store = DS.Store.create({
  revision: 11,
  adapter: App.adapter
});
