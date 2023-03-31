import { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import { FormikErrors } from 'formik';

export type AutoCompleteType = 'password' | 'email' | 'on' | 'off';

export type ErrorType =
  | string
  | string[]
  | FormikErrors<any>
  | FormikErrors<any>[]
  | undefined;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactElement;
  isPassword?: boolean;
  autoComplete?: AutoCompleteType;
  isNewPassword?: boolean;
  error?: string | null;
}
