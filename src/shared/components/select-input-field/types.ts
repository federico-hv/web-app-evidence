import { CSSTheme } from '@holdr-ui/react';

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
}
