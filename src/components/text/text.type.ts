import { ReactNode } from 'react';

export interface TextProps {
  children: ReactNode;
  className?: string;
  size?: 'h1' | 'h2';
  uppercase?: boolean;
}
