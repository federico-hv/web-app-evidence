import { ChangeEvent } from 'react';

interface DatePickerProps {
  date: string;
  onChange: (e: string | ChangeEvent<any>) => void;
}

export type { DatePickerProps };
