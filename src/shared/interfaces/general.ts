import { ReactNode } from 'react';
import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface GenericProps {
  children?: ReactNode;
  onClick?: VoidFunction;
}

export interface IDate {
  month: string;
  day: string;
  year: string;
}

export interface IReturnMany<T> {
  count: number;
  data: T[];
}

export interface LabelWithIcon {
  label: string;
  icon: IconName;
}
