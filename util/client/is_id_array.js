Util.isIdArray = function(array) {
  if (!Ember.isArray(array)) {
    return false;
  }

  for (var i = 0; i < array.length; i++) {
    if (Ember.typeOf(array[i]) !== 'number') {
      return false;
    }
  }

  return true;
};
