import { fireEvent, render, screen } from '@testing-library/react';
import Calendar from '../index';
import { DateUtility } from '../../../../shared';

import dayjs from 'dayjs';
import { createCurrentDayArray } from './util.test';
import { getWeekdays } from '../utilities';

describe('[Calendar]', () => {
  let onClick: VoidFunction;
  let count: number;

  beforeEach(() => {
    count = 0;
    onClick = () => {
      count++;
    };

    render(<Calendar onDayClick={onClick} />);
  });

  it('should correctly render', () => {
    const day = DateUtility.breakdown(dayjs().format('YYYY-MM-DD'));
    expect(screen.getByText(`${day.month} ${day.year}`)).to.exist;
  });

  it('should have correct weekdays', () => {
    for (const weekday of getWeekdays()) {
      expect(screen.getByText(weekday)).to.exist;
    }
  });

  it('should have correct days', () => {
    for (const date of createCurrentDayArray()) {
      expect(screen.getAllByText(date.day)).to.exist;
    }
  });

  it('should allow a user to increment date', () => {
    fireEvent.click(screen.getByLabelText('incrementMonth'));

    const incrementedDate = DateUtility.breakdown(
      dayjs().add(1, 'month').format('YYYY-MM-DD'),
    );

    expect(
      screen.getByText(`${incrementedDate.month} ${incrementedDate.year}`),
    ).to.exist;
  });

  it('should not allow a user to decrement date earlier than current date', () => {
    const day = DateUtility.breakdown(dayjs().format('YYYY-MM-DD'));
    fireEvent.click(screen.getByLabelText('decrementMonth'));

    expect(screen.getByText(`${day.month} ${day.year}`)).to.exist;
  });

  it('should allow a user to decrement date', () => {
    fireEvent.click(screen.getByLabelText('incrementMonth'));
    fireEvent.click(screen.getByLabelText('decrementMonth'));

    const day = DateUtility.breakdown(dayjs().format('YYYY-MM-DD'));

    expect(screen.getByText(`${day.month} ${day.year}`)).to.exist;
  });
});
export {};
