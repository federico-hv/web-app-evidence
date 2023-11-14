import React from 'react';

export interface StepperIndicatorProps {
  current: number;
  children?: React.ReactNode;
}

export interface StepProps {
  active?: boolean;
}
