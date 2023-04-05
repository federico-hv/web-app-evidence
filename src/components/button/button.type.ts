import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  class?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'disabled';
  width?: string;
  type?: 'button' | 'submit' | 'reset';
}
