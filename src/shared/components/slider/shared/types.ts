import { ReactElement } from 'react';

export interface SliderContentProps {
  children: ReactElement;
  onClick?: VoidFunction;
}

export interface SliderIndicatorProps {
  length: number;
  current: number;
  setCurrent: (current: number) => void;
}

export interface SliderButtonsProps {
  incrementCurrent: VoidFunction;
  decrementCurrent: VoidFunction;
}

export type SliderSCNames = 'SliderContent';
