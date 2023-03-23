import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  class?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  width?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
