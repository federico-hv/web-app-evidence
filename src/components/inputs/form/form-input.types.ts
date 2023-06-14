import { IconName } from '@holdr-ui/react/dist/shared/types';
import { StringNumeric } from 'shared';
import { ReactNode } from 'react';

export interface FormInputProps {
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
}
