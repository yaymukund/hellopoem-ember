Util.stringToDate = function(serialized) {
  var type = typeof serialized;

  if (type === 'string' || type === 'number') {
    return new Date(serialized);
  }

  if (serialized === null || serialized === undefined) {
    // if the value is not present in the data,
    // return undefined, not null.
    return undefined;
  }

  return null;
}
