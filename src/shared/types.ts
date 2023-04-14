import { ReactNode } from 'react';
export interface ITemplate {
  name: string;
}

export type TemplateType = string | number;

export interface Link {
  text?: string;
  link?: () => void;
}

export interface FormValues {
  email?: string;
  name?: string;
  birthday?: string;
  displayName?: string;
  artistName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
}
export interface StepProps {
  values: {
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    birthday?: string;
    displayName?: string;
    artistName?: string;
    username?: string;
    image?: string;
  };
  errors: {
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    birthday?: string;
    artistName?: string;
    displayName?: string;
    username?: string;
    image?: string;
  };
  setPage: (page: number) => void;
  isSubmitting?: boolean;
}
