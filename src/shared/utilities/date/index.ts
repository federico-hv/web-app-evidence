import dayjs, { Dayjs, UnitType } from 'dayjs';
import { IDate } from '../../interfaces';
import { StringNumeric } from '../../types';

import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localeData);
dayjs.extend(relativeTime);

type TimeUnit =
  | 'seconds'
  | 'second'
  | 'minutes'
  | 'minute'
  | 'hours'
  | 'hour'
  | 'days'
  | 'day'
  | 'weeks'
  | 'week'
  | 'months'
  | 'month'
  | 'years'
  | 'year';

export class DateUtility {
  static getTime(date: Date): string {
    return dayjs(date).format('hh:mm A');
  }

  static getWeekday(date: Date): string {
    const day = dayjs(date).day();

    switch (day) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return '';
    }
  }

  /**
   * Returns an array containing all weekdays shortened to a 2 letter abbreviation.
   *
   * @returns array of shortened weekdays.
   */

  static getWeekdays(formatFn?: (value: string, index: number) => string) {
    const fn = formatFn ? formatFn : (day: string) => day;

    return dayjs.weekdays().map(fn);
  }

  static allMonths(): string[] {
    return dayjs.localeData().months();
  }

  /**
   * Check if two dates are in the same.
   *
   * @param date0
   * @param date1
   */
  static equal(date0: Date, date1: Date): boolean {
    const _date0 = dayjs(date0);
    const _date1 = dayjs(date1);

    return (
      _date0.format('YYYY-MM-DD').toString() ===
      _date1.format('YYYY-MM-DD').toString()
    );
  }

  /**
   * Check if date0 is less than date1
   *
   * @param date0
   * @param date1
   */
  static lessThan(date0: Date, date1: Date): boolean {
    const _date0 = dayjs(date0);
    const _date1 = dayjs(date1);
    return (
      _date0.format('YYYY-MM-DD').toString() <
      _date1.format('YYYY-MM-DD').toString()
    );
  }

  /**
   * Check if date0 is greater than date1
   *
   * @param date0
   * @param date1
   */
  static greaterThan(date0: Date, date1: Date): boolean {
    const _date0 = dayjs(date0);
    const _date1 = dayjs(date1);
    return (
      _date0.format('YYYY-MM-DD').toString() >
      _date1.format('YYYY-MM-DD').toString()
    );
  }

  /**
   * Adds a value of unit to the given date.
   *
   * @param date the date
   * @param value the value to add
   * @param unit the unit to use. e.g. days, hours
   */
  static add(date: Date, value: number, unit: TimeUnit): Date {
    return dayjs(date).add(value, unit).toDate();
  }

  /**
   * Subtract a value of unit to the given date.
   *
   * @param date the date
   * @param value the value to subtract
   * @param unit the unit to use. e.g. days, hours
   */
  static subtract(date: Date, value: number, unit: TimeUnit): Date {
    return dayjs(date).subtract(value, unit).toDate();
  }

  /**
   * Returns the first day of the week that a date belongs to.
   *
   * Implicitly assumes Sunday is the first day of the week.
   *
   * @param date
   * @param unit
   */
  static getStartOf(date: Date, unit?: TimeUnit): Date {
    return dayjs(date)
      .startOf(unit || 'week')
      .toDate();
  }

  /**
   * Returns the last day of the week that a date belongs to.
   *
   * Implicitly assumes Sunday is the first day of the week.
   *
   * @param date
   * @param unit
   */
  static getEndOf(date: Date, unit?: TimeUnit): Date {
    return dayjs(date)
      .endOf(unit || 'week')
      .toDate();
  }

  /**
   * Calculates the difference between two dates.
   *
   * Implicitly assumes Sunday is the first day of the week.
   *
   * @param day1 a date to compare
   * @param day2 a date to compare
   * @param unit the time unit to use e.g. days/months
   */
  static difference(
    day1: Dayjs,
    day2: Dayjs,
    unit: UnitType = 'day',
  ): number {
    const _day1 = dayjs(day1);
    const _day2 = dayjs(day2);

    return _day1.diff(_day2, unit);
  }

  /**
   * Returns an array of 'numberOfDays' days starting with the 'from' date.
   *
   * @param from the day to start from.
   * @param numberOfDays the number of add to the array.
   */
  static generateDays(from: Date, numberOfDays: number): Array<Date> {
    const days: Date[] = [];

    for (let i = 0; i <= numberOfDays; i++) {
      const date = dayjs(from).add(i, 'days').toDate();

      days.push(date);
    }

    return days;
  }

  /**
   * Returns date in the format `YYYY-MM-DD` when given an IDate object.
   *
   * @param date the date to convert to a string
   */
  static fromBreakdown(date: IDate): string {
    return dayjs(`${date.month} ${date.day} ${date.year}`).format(
      'YYYY-MM-DD',
    );
  }

  /**
   * Converts a month name (e.g. january) to a 0-indexed representation of the month.
   *
   * @param month the month name to parse.
   */
  static parseToIntMonth(month: string) {
    switch (month.toLowerCase()) {
      case 'january':
        return 0;
      case 'february':
        return 1;
      case 'march':
        return 2;
      case 'april':
        return 3;
      case 'may':
        return 4;
      case 'june':
        return 5;
      case 'july':
        return 6;
      case 'august':
        return 7;
      case 'september':
        return 8;
      case 'october':
        return 9;
      case 'november':
        return 10;
      case 'december':
        return 11;
      default:
        return -1;
    }
  }

  /**
   * TODO: Deprecate
   * @param month
   * @param year
   */
  static daysInMonth(month: string, year: string) {
    return dayjs(
      this.fromBreakdown({
        day: '1',
        month: month,
        year: year,
      }),
    ).daysInMonth();
  }

  /**
   * TODO: Deprecate
   *
   * Breaks down a date
   * @param date
   *
   * @returns an object containing:
   * - `day` : the day
   * - `month` the month name
   * - `year` : the year
   */
  static breakdown(date: string): IDate {
    const months = this.allMonths();
    return {
      month: months[dayjs(date).get('month')],
      day: `${dayjs(date).get('date')}`,
      year: `${dayjs(date).get('year')}`,
    };
  }

  /**
   *
   * Returns the unit of the date.
   * @param date
   * @param unit
   */
  static get(date: Date, unit: 'month' | 'day' | 'year'): string {
    switch (unit) {
      case 'month':
        return this.allMonths()[dayjs(date).get('month')];
      case 'day':
        return `${dayjs(date).get('date')}`;
      case 'year':
        return `${dayjs(date).get('year')}`;
      default:
        throw new Error('Invalid date unit.');
    }
  }

  /** Returns a string representation of the date from the current time. e.g. 2 hours.
   *
   * @param date
   */
  static fromNow(date: StringNumeric) {
    return dayjs().from(dayjs(date, 'X'), true);
  }

  /**
   * Returns a string representation of the date in the format of Thur, 9 Nov 2023
   *
   * @param date date to format
   */
  static toDateString(date: Date) {
    return date.toUTCString().split(' ').slice(0, 4)?.join(' ');
  }
}
