import { IconName } from '@holdr-ui/react/dist/shared/types';
import { ReactNode } from 'react';
import { StringNumeric } from '../../types';

export interface FormInputProps {
  helperText?: string;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  name: string;
  type: string;
  onClickButton?: VoidFunction;
  min?: StringNumeric;
  max?: StringNumeric;
  children?: ReactNode;
  prefix?: string;
  autoFocus?: boolean;
}
