import { ReactNode } from 'react';

export interface LoaderProps {
  children: ReactNode;
  loading: boolean;
  as?: JSX.Element;
  h?: any;
}
