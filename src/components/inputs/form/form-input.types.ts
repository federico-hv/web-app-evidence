import { IconName } from '@holdr-ui/react/dist/shared/types';
import { StringNumeric } from 'shared';

export interface FormInputProps {
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
}
