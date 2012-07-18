var express = require('express');
var app = express();

app.configure(function() {
  // Parse request bodies into a JSON object.
  app.use(express.bodyParser());

  // Use `app.delete` and `app.put` in routes instead of `app.post`ing everything.
  app.use(express.methodOverride());

  // Required for sessions (see below).
  var secret = require('./secret.json');
  app.use(express.cookieParser(secret.session));

  // Express sessions backed by Redis.
  var RedisStore = require('connect-redis')(express);
  var db = require('./db').connection();

  app.use(express.session({
    store: new RedisStore({client: db}) // Use a single db connection.
  }));

  // Use browserify to share client/server code.
  var browserify = require('browserify');

  var clientJs = browserify({
    mount: '/client.js',
    require: __dirname + '/client/application.js'
  });

  app.use(clientJs);
});

// Dev options.
app.configure('development', function() {
  app.use(express.logger());
});

// Start the server!
var http = require('http');
var coreServer = http.createServer(app);

if (module.parent) {
  module.exports = coreServer;
} else {
  coreServer.listen(3000);
}
