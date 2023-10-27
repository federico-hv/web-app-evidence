import dayjs from 'dayjs';
import { DateUtility } from '../../../../shared';
import { CalendarState } from '../types';

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
  for (let i = 0; i < startDate; i++) {
    days.push({
      day: previousDays - startDate + i,
      disabled: true,
    });
  }

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

  const length = days.length;
  for (let i = 0; i < 35 - length; i++) {
    days.push({
      day: i + 1,
      disabled: true,
    });
  }

  return days;
}

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
