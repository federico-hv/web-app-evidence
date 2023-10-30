import { IDate } from '../..';

export type CalendarProps = {
  onDayClick: (date: IDate) => void;
};

export type DateProps = {
  date: IDate;
  currentDate: string;
  onClick: VoidFunction;
  disabled: boolean;
};
