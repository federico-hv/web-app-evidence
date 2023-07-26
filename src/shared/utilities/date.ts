import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IDate } from '../interfaces';
import { StringNumeric } from '../types';

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

  static breakdown(date: string): IDate {
    const months = this.allMonths();
    return {
      month: months[dayjs(date).get('month')],
      day: `${dayjs(date).get('day')}`,
      year: `${dayjs(date).get('year')}`,
    };
  }

  static fromNow(date: StringNumeric) {
    dayjs.extend(relativeTime);
    return dayjs().from(dayjs(date, 'X'), true);
  }
}
