import { IDate } from '../..';

export type CalendarState = {
  month: string;
  year: string;
};
export type CalendarProps = {
  onDayClick: (date: IDate) => void;
  startingDate: IDate;
};

export type DateProps = {
  date: IDate;
  initialDate: IDate;
  onClick: VoidFunction;
  disabled: boolean;
};
