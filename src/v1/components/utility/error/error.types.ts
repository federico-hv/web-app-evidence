import { ReactNode } from 'react';

export interface ErrorProps {
  errorMessage?: string;
  errorTitle?: string;
  hasError: boolean;
  children?: ReactNode;
  errorEl?: JSX.Element;
}
