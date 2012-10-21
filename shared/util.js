var util = {
  constants: {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },

  pad: function(num) {
    return (num < 10) ? '0' + num : num.toString();
  },

  dateToString: function(date) {
    if (date == undefined) {
      return undefined;
    }

    if (!(date instanceof Date)) {
      return null;
    }

    var utcYear = date.getUTCFullYear(),
        month = this.constants.months[date.getUTCMonth()],
        dayOfMonth = this.pad(date.getUTCDate()),
        dayOfWeek = this.constants.days[date.getUTCDay()],
        utcHours = this.pad(date.getUTCHours()),
        utcMinutes = this.pad(date.getUTCMinutes()),
        utcSeconds = this.pad(date.getUTCSeconds());

    return dayOfWeek + ', '
         + dayOfMonth + ' '
         + month + ' '
         + utcYear + ' '
         + utcHours + ':'
         + utcMinutes + ':'
         + utcSeconds + ' GMT';
  },

  stringToDate: function(serialized) {
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
};

// Make this usable on the server as well as the client!
if (module.exports) {
  module.exports = util;
};
