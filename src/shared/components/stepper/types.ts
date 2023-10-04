import { ReactNode } from 'react';

export interface StepperProps {
  defaultStep?: number;
  children?: ReactNode;

  increment?: VoidFunction;
  decrement?: VoidFunction;
  step?: number;
}
