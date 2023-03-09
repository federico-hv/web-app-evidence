import { ReactNode } from 'react';
export interface ITemplate {
  name: string;
}

export type TemplateType = string | number;

export interface TextProps {
  children: ReactNode;
  className?: string;
  size?: 'h1' | 'h2';
  uppercase?: boolean;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  width?: string;
}
