import { fireEvent, render, screen } from '@testing-library/react';
import Calendar from '../index';
import { DateUtility } from '../../../../shared';

import dayjs from 'dayjs';

describe('[Calendar]', () => {
  let onClick: VoidFunction;
  let count: number;

  beforeEach(() => {
    count = 0;
    onClick = () => {
      count++;
    };

    render(<Calendar onDateClick={onClick} />);
  });

  it('should correctly render', () => {
    const day = DateUtility.breakdown(dayjs().format('YYYY-MM-DD'));
    expect(screen.getByText(`${day.month} ${day.year}`)).to.exist;
  });

  it('should have correct weekdays', () => {
    for (const weekday of DateUtility.getWeekdays()) {
      expect(screen.getByText(weekday)).to.exist;
    }
  });

  it('should have correct days', () => {
    const currentDate = dayjs().toDate();
    const firstDateOfMonth = DateUtility.getStartOf(currentDate, 'month');
    const lastDateOfMonth = DateUtility.getEndOf(currentDate, 'month');
    const firstDateInFirstMonthWeek = DateUtility.getStartOf(
      firstDateOfMonth,
      'week',
    );
    const lastDateInLastMonthWeek = DateUtility.getEndOf(
      lastDateOfMonth,
      'week',
    );

    const numberOfDaysInMonth = DateUtility.difference(
      firstDateInFirstMonthWeek,
      lastDateInLastMonthWeek,
      'day',
    );

    const days = DateUtility.generateDays(
      firstDateInFirstMonthWeek,
      numberOfDaysInMonth,
    );
    for (const date of days) {
      expect(screen.getAllByText(date.getDay())).to.exist;
    }
  });

  it('should allow a user to view the following months', () => {
    fireEvent.click(screen.getByLabelText('view next month'));

    const oneMonthFromNow = DateUtility.breakdown(
      dayjs().add(1, 'month').format('YYYY-MM-DD'),
    );

    expect(
      screen.getByText(`${oneMonthFromNow.month} ${oneMonthFromNow.year}`),
    ).to.exist;
  });

  it('should not view previous months from current month', () => {
    const day = DateUtility.breakdown(dayjs().format('YYYY-MM-DD'));
    fireEvent.click(screen.getByLabelText('view next month'));

    expect(screen.getByText(`${day.month} ${day.year}`)).to.exist;
  });

  it('should allow view previous months', () => {
    fireEvent.click(screen.getByLabelText('view next month'));
    fireEvent.click(screen.getByLabelText('view next month'));

    const day = DateUtility.breakdown(dayjs().format('YYYY-MM-DD'));

    expect(screen.getByText(`${day.month} ${day.year}`)).to.exist;
  });
});

export {};
