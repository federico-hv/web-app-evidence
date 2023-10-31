import { render } from '@testing-library/react';
import Date from '../ui/calendar-date';
import dayjs from 'dayjs';

describe('[Date]', () => {
  it('should correctly render', () => {
    render(
      <Date
        onClick={() => {}}
        date={{ day: '1', month: '1', year: '2023' }}
        disabled={false}
        currentDate={dayjs().format('YYYY-MM-DD')}
      />,
    );
  });
});

export {};
