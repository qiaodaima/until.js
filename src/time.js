/**
 * 获取某个日期对应的时间戳
 *
 * example: getTimeStamp('2014/07/10 10:21:12')
 * return: 1558598298166
 *
 * example: getTimeStamp('2014-07-10 10:21:12')
 * return: 1558598298166
 *
 * example: getTimeStamp()
 * return: 1558598298166
 *
 * @param {string} date 要获取的日期, 默认为当前日期
 * @returns {number} 该日期对应的时间戳 单位毫秒
 */
export const getTimeStamp = date => {
  // ios 不支持 '2014-07-10 10:21:12' 这样的格式
  const dateString = new Date(date ? date.replace(/-/g, '/') : new Date());

  return Date.parse(dateString);
};


/**
 * 格式化时间戳
 *
 * example: formatDate()
 * return: { year: 2019, month: 5, day: 23, hour: 23, minute: 26, second: 11, millisecond: 753 }
 *
 * example: formatDate(1558622540000)
 * return: { year: 2019, month: 5, day: 23, hour: 22, minute: 42, second: 20, millisecond: 0 }
 *
 * example: formatDate(-1378218728000) 参数可以是负整数，代表1970年元旦之前的时间
 * return: { year: 1926, month: 4, day: 30, hour: 17, minute: 27, second: 52, millisecond: 0 }
 *
 * @param {number} timeStamp 时间戳, 默认为当前日期对应的时间戳, 单位毫秒
 * @returns {object} 被格式化后的对象 { year: 2019, month: 5, day: 23, hour: 23, minute: 26, second: 11, millisecond: 753 }
 */
export const formatDate = (timeStamp = Date.now()) => {
  const date = new Date(timeStamp);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds()
  }
}


/**
 * 格式化倒计时时间
 *
 * example: getCountDown(642567521)
 * return: { day: 7, hour: 10, minute: 29, second: 27, millisecond: 521 }
 *
 * example: getCountDown(-123)
 * return: { day: 0, hour: 0, minute: 0, second: 0, millisecond: 0 }
 *
 * @param {number} timeStamp 时间戳 (两个时间戳的差值) 单位毫秒
 * @returns {object} 被格式化后的对象
 */
export const formatCountDown = timeStamp => {
  if (timeStamp <= 0) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
  }

  const dayStamp = 24 * 60 * 60 * 1000;
  const hourStamp = 60 * 60 * 1000;
  const minuteStamp = 60 * 1000;
  const secondStamp = 1000;
  const millisecondStamp = 1000;

  const day = timeStamp / dayStamp | 0;
  const hour = timeStamp % dayStamp / hourStamp | 0;
  const minute = timeStamp % dayStamp % hourStamp / minuteStamp | 0;
  const second = timeStamp % dayStamp % hourStamp % minuteStamp / secondStamp | 0;
  const millisecond = timeStamp % dayStamp % hourStamp % minuteStamp % millisecondStamp;

  return { day, hour, minute, second, millisecond };
}


/**
 * 判断当前时间是否在指定时间之前
 *
 * example: isBefore('2050/07/10 10:21:12')
 * return: true
 *
 * example: isBefore('2008-08-10 10:21:12')
 * return: false
 *
 * @param {string} date 参照的时间
 * @returns {bool} true: 当前时间小于参照时间；false: 当前时间大于等于参照时间
 */
export const isBefore = (date) => {
  return getTimeStamp() < getTimeStamp(date);
}


/**
 * 判断当前时间是否在指定之间之后
 *
 * example: isAfter('1949/10/01 10:21:12')
 * return: true
 *
 * example: isAfter('2050-07-10 10:21:12')
 * return: false
 *
 * @param {string} date 参照的时间
 * @returns {bool} true: 当前时间大于参照时间；false: 当前时间小于等于参照时间
 */
export const isAfter = (date) => {
  return getTimeStamp() > getTimeStamp(date);
}


/**
 * 判断当前时间是否在指定时间范围内
 *
 * example: isBetween('1949/10/01 10:21:12', '2050/10/01 10:21:12')
 * return: true
 *
 * example: isBetween('1949-10-01 10:21:12', '2008/10/01 10:21:12')
 * return: false
 *
 * @param {string} beforeDate 参照的起始时间
 * @param {string} afterDate 参照的结束时间
 * @returns {bool} true: 当前时间大于等于起始时间，并且当前时间小于等于结束时间；false: 当前时间小于起始时间，或者当前时间大于结束时间
 */
export const isBetween = (beforeDate, afterDate) => {
  return (getTimeStamp(beforeDate) <= getTimeStamp()) && (getTimeStamp() <= getTimeStamp(afterDate));
}
