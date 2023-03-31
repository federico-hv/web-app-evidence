import { ReactNode } from 'react';
export interface ITemplate {
  name: string;
}

export type TemplateType = string | number;

export interface Link {
  text?: string;
  link?: () => void;
}
