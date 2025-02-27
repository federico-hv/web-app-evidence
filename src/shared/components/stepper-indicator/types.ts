import React from 'react';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

export interface StepperIndicatorProps {
  current: number;
  children?: React.ReactNode;
}

export interface StepProps {
  active?: boolean;
  fillColor?: ThemeColor; //default: purple500
  variant?: 'pill' | 'bar'; //default: bar
}
