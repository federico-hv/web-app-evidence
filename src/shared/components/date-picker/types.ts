import { ChangeEvent } from 'react';

interface DatePickerProps {
  date: string;
  onChange: (e: string | ChangeEvent<any>) => void;
  min?: string;
  max?: string;
}

export type { DatePickerProps };
