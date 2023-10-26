import { useState } from 'react';
import { CalendarDate } from '../types/calendar-types';
import _ from 'lodash';

export function useDate(currentDate: CalendarDate) {
  currentDate = _.omit(currentDate, 'day');
  const [date, setDate] = useState<CalendarDate>(currentDate);
  const [isCurrentDate, setIsCurrentDate] = useState<boolean>(true);

  const incrementDate = () => {
    if (_.isEqual(date, currentDate)) {
      setIsCurrentDate(true);
      return;
    }

    let month = parseInt(date.month);
    let year = parseInt(date.year);

    month === 12
      ? setDate({ month: '1', year: (++year).toString() })
      : setDate({ month: (++month).toString(), year: date.year });
  };

  const decrementDate = () => {
    setIsCurrentDate(false);
    let month = parseInt(date.month);
    let year = parseInt(date.year);

    month === 1
      ? setDate({ month: '12', year: (--year).toString() })
      : setDate({ month: (--month).toString(), year: date.year });
  };

  return {
    calendarDate: date,
    isCurrentDate,
    incrementDate,
    decrementDate,
  };
}
