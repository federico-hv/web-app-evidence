import { CSSTheme } from '@holdr-ui/react/dist/shared/types';
import { IDate } from '../..';

export type CalendarProps = {
  onDayClick: (date: IDate) => void;
};

export type DateProps = {
  date: IDate;
  onClick: VoidFunction;
  currentDate: string;
  disabled: boolean;
};

type DateTheme = {
  css?: CSSTheme;
  _hover?: CSSTheme;
};
