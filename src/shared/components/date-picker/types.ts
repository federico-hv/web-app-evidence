interface DatePickerProps {
  label?: string;
  name: string;
  errorText?: string;
  tooltip?: string;
  date: string;
  onChange: (date: string) => void;
  min?: string;
  max?: string;
}

export type { DatePickerProps };
