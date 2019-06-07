'use strict';

class DateUtils {
  static time(): number {
    return Math.floor(Date.now() / 1000);
  }
}

export default DateUtils;