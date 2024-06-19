import { ChangeEvent } from 'react';
import { CSSTheme } from '@holdr-ui/react';

export interface InputTextFieldProps {
  name: string;
  label?: string;
  value?: string;
  tooltip?: string;
  placeholder: string;
  errorText?: string;
  maxLength?: number;
  minLength?: number;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  css?: CSSTheme;
}
