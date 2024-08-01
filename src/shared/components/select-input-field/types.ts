import { CSSTheme } from '@holdr-ui/react';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

type ItemFn<T> = (item: T) => string;

export interface SelectInputFieldProps<T> {
  placeholder?: string;
  triggerCSS?: CSSTheme;
  _active?: CSSTheme;
  _hover?: CSSTheme;
  _highlighted?: CSSTheme;
  onValueChange?: (value: string) => void;
  value?: string;
  options: T[];
  keySelector: ItemFn<T>;
  labelSelector: ItemFn<T>;
  valueSelector: ItemFn<T>;
  className?: string;
  name: string;
  errorText?: string;
  tooltip?: string;
  label?: string;
  labelProps?: TextProps;
  position?: 'item-aligned' | 'popper';
}
