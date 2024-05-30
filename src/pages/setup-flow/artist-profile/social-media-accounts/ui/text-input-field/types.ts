import { ChangeEvent } from 'react';

export interface TextInputFieldProps {
  name: string;
  label: string;
  value?: string;
  tooltip?: string;
  placeholder: string;
  errorText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
