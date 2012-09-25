var resources = require('./resources');

module.exports = function(app) {
  for (key in resources) {
    resources[key].extend(app);
  }
};
