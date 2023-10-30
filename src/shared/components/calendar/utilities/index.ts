import dayjs from 'dayjs';
import { DateUtility } from '../../../../shared';
import { CalendarState } from '../types';

/**
 * Returns an array containing the required days in the previous month,
 * the days in the desired month aligned correctly,
 * and the days in the next month so that the array length is modulo 7.
 *
 * @param month numeric string between [1, 12] representing a month.
 * @param year numeric string representing a year
 * @returns an array containing all days in a month
 */
export function getDays(month: string, year: string) {
  const startDate = dayjs(
    DateUtility.fromBreakdown({ month: month, year: year, day: '1' }),
  ).get('day');

  const previousMonth = getPreviousMonth({ month: month, year: year });
  const previousDays = DateUtility.daysInMonth(
    previousMonth.month,
    previousMonth.year,
  );

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
      { length: DateUtility.daysInMonth(month, year) },
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

export function getPreviousMonth(date: CalendarState) {
  let month = parseInt(date.month);
  let year = parseInt(date.year);

  if (month === 1) return { month: '12', year: (--year).toString() };

  return {
    month: (--month).toString(),
    year: date.year,
  };
}

export function getNextMonth(date: CalendarState) {
  let month = parseInt(date.month);
  let year = parseInt(date.year);

  if (month === 12) return { month: '1', year: (++year).toString() };

  return {
    month: (++month).toString(),
    year: date.year,
  };
}
