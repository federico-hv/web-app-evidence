import { ErrorProps } from './error.types';

function Error({ hasError, children, errorEl: el }: ErrorProps) {
  if (hasError) {
    return <>{el}</>;
  }

  return <>{children}</>;
}
Error.displayName = 'Error';

export default Error;
