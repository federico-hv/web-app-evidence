import { ChangeEvent, ReactElement } from 'react';
import { FormikErrors } from 'formik';

export type AutoCompleteValues = 'password' | 'email' | 'on' | 'off';

export type ErrorTypes =
  | string
  | string[]
  | FormikErrors<any>
  | FormikErrors<any>[]
  | undefined;

export interface InputProps {
  value?: string;
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactElement;
  isPassword?: boolean;
  autoComplete?: AutoCompleteValues;
  isNewPassword?: boolean;
  error?: ErrorTypes;
}
