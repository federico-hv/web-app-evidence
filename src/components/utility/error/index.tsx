import { ErrorProps } from './error.types';
import { useEffect } from 'react';
import { useToast } from '../../../hooks';

function Error({ hasError, errorEl: el, errorMessage }: ErrorProps) {
  const { open } = useToast({
    description:
      errorMessage ||
      'Oops, something went wrong. It looks like its our fault. Please try again later.',
    status: 'danger',
  });

  useEffect(() => {
    if (hasError && errorMessage && open) {
      open();
    }
  }, [hasError, errorMessage, open]);

  if (el && hasError) {
    return <>{el}</>;
  }
}
Error.displayName = 'Error';

export default Error;
