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
      <Date date={dayjs().toDate()} onClick={onClick} disabled={false} />,
    );
  });

  it('should correctly render the date, containing the first', () => {
    const { getByText } = render(
      <Date onClick={onClick} date={dayjs().toDate()} disabled={false} />,
    );
    expect(getByText(1)).to.exist;
  });

  it('should call onClick when Date is clicked', async () => {
    const { getByText } = render(
      <Date onClick={onClick} date={dayjs().toDate()} disabled={false} />,
    );

    fireEvent.click(getByText(1));
    expect(count).to.equal(1);
  });

  it('should not call onClick when Date is clicked and disabled', async () => {
    const { getByText } = render(
      <Date onClick={onClick} date={dayjs().toDate()} disabled={true} />,
    );

    fireEvent.click(getByText(1));
    expect(count).to.equal(0);
  });
});

export {};
