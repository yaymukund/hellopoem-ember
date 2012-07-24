var redis = require('redis');
var _     = require('underscore');

exports.connection = _.once(redis.createClient);
