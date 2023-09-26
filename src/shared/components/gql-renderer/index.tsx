import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from '../index';
import { GQLRendererProps } from './types';

function GQLRenderer({ children, ErrorFallback }: GQLRendererProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader loading={true} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
GQLRenderer.displayName = 'GQLRenderer';

export default GQLRenderer;
