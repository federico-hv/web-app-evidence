import { CalendarDate } from './calendar-types';

export type DateProps = {
  date: CalendarDate;
  currentDate: CalendarDate;
  onClick?: () => void;
  disabled: boolean;
};
