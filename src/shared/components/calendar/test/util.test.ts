import dayjs from 'dayjs';
import { getDays, getWeekdays } from '../utilities';
import { DateUtility } from '../../../../shared';

describe('[Date Utility]', () => {
  describe('[getDays]', () => {
    it('should correctly get October 2023 days', () => {
      const days = Array.from({ length: 35 }, (_, i) => {
        return {
          day: (i % 31) + 1,
          disabled: i >= 31,
        };
      });

      expect(getDays('2023-10-05')).to.deep.equal(days);
    });

    it('should correctly get February 2024 days', () => {
      const days = Array.from({ length: 35 }, (_, i) => {
        if (i + 1 <= 4)
          return {
            day: 28 + i,
            disabled: true,
          };

        return {
          day: ((i - 4) % 29) + 1,
          disabled: i - 4 >= 29,
        };
      });

      expect(getDays('2024-02-10')).to.deep.equal(days);
    });

    it('should correctly get todays days', () => {
      const date = dayjs();
      const days = createCurrentDayArray();

      expect(getDays(date.format('YYYY-MM-DD'))).to.deep.equal(days);
    });
  });

  describe('[getWeekdays]', () => {
    it('should get correct weekdays', () => {
      const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      expect(getWeekdays()).to.deep.equal(weekdays);
    });
  });
});

export function createCurrentDayArray() {
  const date = dayjs();
  const startDate = date.startOf('month').get('day');

  const formattedCurrentDate = DateUtility.breakdown(
    date.format('YYYY-MM-DD'),
  );

  const formattedPreviousDate = DateUtility.breakdown(
    date.subtract(1, 'month').format('YYYY-MM-DD'),
  );

  const numDays = DateUtility.daysInMonth(
    formattedCurrentDate.month,
    formattedCurrentDate.year,
  );

  const nextMonthNumDays = DateUtility.daysInMonth(
    formattedPreviousDate.month,
    formattedPreviousDate.year,
  );

  const length = numDays + startDate > 35 ? 42 : 35;

  const days = Array.from({ length: length }, (_, i) => {
    if (i + 1 <= startDate)
      return {
        day: nextMonthNumDays - startDate + i + 1,
        disabled: true,
      };

    return {
      day: ((i - startDate) % numDays) + 1,
      disabled: i - startDate >= numDays,
    };
  });
  return days;
}

export {};
