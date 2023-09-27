import { Fragment, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from '../index';
import { GQLRendererProps } from './types';

function GQLRenderer({
  children,
  LoadingFallback,
  ErrorFallback,
}: GQLRendererProps) {
  return (
    <Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            LoadingFallback ? LoadingFallback : <Loader loading={true} />
          }
        >
          {children}
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
}
GQLRenderer.displayName = 'GQLRenderer';

export default GQLRenderer;
