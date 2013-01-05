Util.dateToString = function(date) {
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
};
