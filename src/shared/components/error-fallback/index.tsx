import Error from '../error';
import { ErrorFallbackProps } from './types';
function ErrorFallback({ error }: ErrorFallbackProps) {
  // Call resetErrorBoundary() to reset the error-fallback boundary and retry the render.

  return <Error hasError={true} errorMessage={error.message} />;
}
ErrorFallback.displayName = 'Error Fallback';

export default ErrorFallback;
