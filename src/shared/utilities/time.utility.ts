import dayjs from 'dayjs';

/**
* Get the formatted time from a date.
* 
* @param date a date
* @returns a string that shows the time. e.g. "9:54 p.m." or"9:54 a.m.""
*/
export const getFormattedTime = (date: Date) => {
  return dayjs(date).format('h:mm A').replace('AM', 'a.m.').replace('PM', 'p.m.');
};
