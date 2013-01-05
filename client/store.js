// Adapter.
App.Adapter = DS.RESTAdapter;

// Create the adapter.
App.adapter = App.Adapter.create({ bulkCommit: false });

// Transforms for serializing different types.
App.adapter.registerTransform('date', {
  fromJSON: App.Util.stringToDate.bind(App.Util),
  toJSON: App.Util.dateToString.bind(App.Util)
});

// Attach the adapter to App.
App.store = DS.Store.create({
  revision: 6,
  adapter: App.adapter
});
