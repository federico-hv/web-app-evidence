import { ChangeEvent } from 'react';

export interface TextInputFieldProps {
  name: string;
  label: string;
  value?: string;
  tooltip?: string;
  placeholder: string;
  errorText?: string;
  maxLength?: number;
  minLength?: number;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
