export type CalendarProps = {
  onDateClick: (date: Date) => void;
};

export type DateProps = {
  active: boolean;
  date: Date;
  onClick: VoidFunction;
  disabled: boolean;
};
