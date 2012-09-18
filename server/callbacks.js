// Some callbacks that might be shared by multiple controllers.
exports.randomId = function(req, res, next) {
  this.db.srandmember('ids:' + this.resourceName, function(err, randomId) {
    res.locals.resourceId = randomId;
    next(err);
  });
};
