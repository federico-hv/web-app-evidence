import { ErrorProps } from './types';
import { Alert } from '@holdr-ui/react';

function Error({
  hasError,
  errorEl: el,
  errorMessage,
  children,
}: ErrorProps) {
  // const { open } = useToast({
  //   description:
  //     errorMessage ||
  //     'Oops, something went wrong. It looks like its our fault. Please try again later.',
  //   status: 'danger',
  // });

  // useEffect(() => {
  //   if (hasError && errorMessage && open) {
  //     // open();
  //   }
  // }, [hasError, errorMessage, open]);

  if (el && hasError) {
    return <>{el}</>;
  } else if (errorMessage && hasError) {
    return (
      <Alert status='error'>
        <Alert.Description>{errorMessage}</Alert.Description>
      </Alert>
    );
  }

  return <>{children}</>;
}
Error.displayName = 'Error';

export default Error;
