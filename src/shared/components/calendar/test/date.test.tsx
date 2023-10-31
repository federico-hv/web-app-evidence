import { fireEvent, render } from '@testing-library/react';
import Date from '../ui/calendar-date';
import dayjs from 'dayjs';

describe('[Date]', () => {
  let onClick: VoidFunction;
  let count: number;

  beforeEach(() => {
    count = 0;
    onClick = () => {
      count++;
    };
  });

  it('should correctly render', () => {
    render(
      <Date
        onClick={onClick}
        date={{ day: '1', month: '1', year: '2023' }}
        disabled={false}
        currentDate={dayjs().format('YYYY-MM-DD')}
      />,
    );
  });

  it('should correctly render day as 1', () => {
    const { getByText } = render(
      <Date
        onClick={onClick}
        date={{ day: '1', month: '1', year: '2023' }}
        disabled={false}
        currentDate={dayjs().format('YYYY-MM-DD')}
      />,
    );
    expect(getByText(1)).to.exist;
  });

  it('should call onClick when Date is clicked', async () => {
    const { getByText } = render(
      <Date
        onClick={onClick}
        date={{ day: '1', month: '1', year: '2023' }}
        disabled={false}
        currentDate={dayjs().format('YYYY-MM-DD')}
      />,
    );

    fireEvent.click(getByText(1));
    expect(count).to.equal(1);
  });

  it('should not call onClick when Date is clicked and disabled', async () => {
    const { getByText } = render(
      <Date
        onClick={onClick}
        date={{ day: '1', month: '1', year: '2023' }}
        disabled={true}
        currentDate={dayjs().format('YYYY-MM-DD')}
      />,
    );

    fireEvent.click(getByText(1));
    expect(count).to.equal(0);
  });
});

export {};
