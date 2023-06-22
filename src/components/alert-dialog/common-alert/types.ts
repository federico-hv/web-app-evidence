import { ReactNode } from 'react';

export interface CommonAlertProps {
  description: string;
  actionText: string;
  heading: string;
  children: ReactNode;
  variant?: 'informational' | 'destructive';
  onAction?: VoidFunction;
}
