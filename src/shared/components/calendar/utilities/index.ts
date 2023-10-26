import dayjs from 'dayjs';
import { DateUtility } from '../../../../shared/utilities';
import { CalendarDate } from '../types/calendar-types';

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function getDays(month: string, year: string): number[] {
  const days = Array.from(
    { length: DateUtility.daysInMonth(month, year) },
    (_, i) => i + 1,
  );

  const length = days.length;
  for (let i = 0; i < 35 - length; i++) {
    days.push(i + 1);
  }

  return days;
}

export function getWeekdays(date: CalendarDate) {
  const startDate = dayjs(
    DateUtility.fromBreakdown({ ...date, day: '1' }),
  ).day();

  const orderedWeekDays: string[] = [];

  for (let i = 0; i < weekdays.length; i++) {
    orderedWeekDays.push(weekdays[(i + startDate) % 7]);
  }

  return orderedWeekDays;
}
