var redis = require('redis'),
    ran,
    client;

exports.connection = function() {
  if (ran) {
    return client;

  } else {
    ran = true;
    client = redis.createClient();
  }
}
