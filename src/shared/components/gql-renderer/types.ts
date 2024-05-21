import { GenericProps } from '../../interfaces';
import { ComponentType, ReactNode } from 'react';
import { FallbackProps } from 'react-error-boundary';

export interface GQLRendererProps extends GenericProps {
  ErrorFallback?: ComponentType<FallbackProps>;
  LoadingFallback?: ReactNode;
}
