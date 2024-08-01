import { ChangeEvent, ReactNode } from 'react';
import { CSSTheme } from '@holdr-ui/react';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';
import { ResponsiveValue, Size } from '@holdr-ui/react/dist/shared';

export interface InputTextFieldProps {
  type?: 'number' | 'email' | 'text' | 'search' | 'password';
  size?: ResponsiveValue<Size>;
  name: string;
  tooltip?: string;
  label?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  errorText?: string;
  maxLength?: number;
  minLength?: number;
  readOnly?: boolean;
  autoComplete?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  css?: CSSTheme;
  labelProps?: TextProps;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}
