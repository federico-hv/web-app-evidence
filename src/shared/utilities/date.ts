import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IDate } from '../interfaces';
import { StringNumeric } from '../types';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

export class DateUtility {
  static allMonths(): string[] {
    return dayjs.localeData().months();
  }

  static fromBreakdown(date: IDate) {
    return dayjs(`${date.month} ${date.day} ${date.year}`).format(
      'YYYY-MM-DD',
    );
  }

  static daysInMonth(month: string, year: string) {
    return dayjs(
      this.fromBreakdown({
        day: '1',
        month: month,
        year: year,
      }),
    ).daysInMonth();
  }

  static breakdown(date: string, format = 'YYYY-MM-D'): IDate {
    const months = this.allMonths();
    return {
      month: months[dayjs(date).get('month')],
      day: `${dayjs(date).get('date')}`,
      year: `${dayjs(date).get('year')}`,
    };
  }

  static fromNow(date: StringNumeric) {
    dayjs.extend(relativeTime);
    return dayjs().from(dayjs(date, 'X'), true);
  }

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

  static daysInMonth(month: string, year: string) {
    return dayjs(
      this.fromBreakdown({
        day: '1',
        month: month,
        year: year,
      }),
    ).daysInMonth();
  }

  static breakdown(date: string, format = 'YYYY-MM-D'): IDate {
    const months = this.allMonths();
    return {
      month: months[dayjs(date).get('month')],
      day: `${dayjs(date).get('date')}`,
      year: `${dayjs(date).get('year')}`,
    };
  }

  static fromNow(date: StringNumeric) {
    dayjs.extend(relativeTime);
    return dayjs().from(dayjs(date, 'X'), true);
  }
}
