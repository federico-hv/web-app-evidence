import { Fragment, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from '../index';
import { GQLRendererProps } from './types';

function GQLRenderer({
  children,
  LoadingFallback = <Loader loading={true} />,
  ErrorFallback = () => <Fragment />,
}: GQLRendererProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={LoadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
GQLRenderer.displayName = 'GQLRenderer';

export default GQLRenderer;
