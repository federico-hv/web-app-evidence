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
  dateOfBirth?: string;
  displayName?: string;
  artistName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}
export interface StepProps {
  values: {
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    dateOfBirth?: string;
    displayName?: string;
    artistName?: string;
    username?: string;
  };
  errors: {
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    dateOfBirth?: string;
    artistName?: string;
    displayName?: string;
    username?: string;
  };
  setPage: (page: number) => void;
  isSubmitting?: boolean;
}
