Util.idArrayToString = function(array) {
  if (this.isIdArray(array)) {
    return JSON.stringify(array);
  } else {
    return JSON.stringify([]);
  }
};
