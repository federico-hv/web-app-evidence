import { ReactNode } from 'react';

export interface GenericProps {
  children?: ReactNode;
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
