var redis = require('redis'),
    _     = require('underscore');

exports.connection = _.once(redis.createClient);
