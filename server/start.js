var express = require('express');
var app = express();

var start = function(environment) {
  if (typeof(environment) !== 'undefined') {
    app.set('env', environment);
  }

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

  // Serve compiled JS and index.html.
  app.use(express.static(__dirname + '/public'));

  // Dev options.
  if (app.get('env') === 'development') {
    app.use(express.logger());
    app.all('*', function(req, res, next) {
      console.log('body:');
      console.log(req.body);
      next();
    });
  }

  // Set up routing.
  require('./routes.js')(app);

  return app;
};

if (module.parent) {
  module.exports = start;
} else {
  // Start the server!
  var http = require('http');
  var app = start();
  http.createServer(app).listen(3000);
}
