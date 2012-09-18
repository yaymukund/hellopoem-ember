module.exports = function(app) {
  require('./resources/line').extend(app);
  require('./resources/poem').extend(app);
};
