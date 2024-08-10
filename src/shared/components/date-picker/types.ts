import { ReactNode } from 'react';

interface DatePickerProps {
  label?: string;
  name: string;
  errorText?: string;
  tooltip?: ReactNode;
  date: string;
  onChange: (date: string) => void;
  min?: string;
  max?: string;
}

export type { DatePickerProps };
