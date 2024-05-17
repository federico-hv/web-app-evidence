import { Role } from '../../index';
import { ReactElement } from 'react';

export interface AuthGuardProps {
  roles?: Role[];
  fallback?: ReactElement;
}
