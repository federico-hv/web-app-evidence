import { ReactNode } from 'react';

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
