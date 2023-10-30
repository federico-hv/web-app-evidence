import dayjs from 'dayjs';
import { DateUtility } from '../../../../shared';

/**
 * Returns an array containing the required days in the previous month,
 * the days in the desired month aligned correctly,
 * and the days in the next month so that the array length is modulo 7.
 *
 * @param date string representation of date as YYYY-MM-DD
 * @returns an array containing all days in a month
 */
export function getDays(date: string) {
  const dayjsDate = dayjs(date);
  const dateObject = DateUtility.breakdown(dayjsDate.format('YYYY-MM-DD'));

  const startDate = dayjsDate.startOf('month').get('day');
  const previousDays = dayjsDate.subtract(1, 'month').daysInMonth();

  let days = [];

  // populate the array with previous months dates if necessary
  for (let i = 1; i <= startDate; i++) {
    days.push({
      day: previousDays - startDate + i,
      disabled: true,
    });
  }

  // populate the array with current months dates
  days = days.concat(
    Array.from(
      {
        length: DateUtility.daysInMonth(dateObject.month, dateObject.year),
      },
      (_, i) => {
        return {
          day: i + 1,
          disabled: false,
        };
      },
    ),
  );

  // populate the array with next months dates if necessary
  for (let i = 0; days.length % 7 != 0; i++) {
    days.push({
      day: i + 1,
      disabled: true,
    });
  }

  return days;
}

/**
 * Returns an array containing all weekdays shortened to a 2 letter abbreviation.
 *
 * @returns array of shortened weekdays.
 */
export function getWeekdays() {
  return dayjs.weekdays().map((weekday) => weekday.substring(0, 2));
}
