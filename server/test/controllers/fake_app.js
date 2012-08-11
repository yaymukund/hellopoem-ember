var app = require('../../start')('test');
var resource = require('./fake_controller');

resource.initialize(app);
module.exports = app;
