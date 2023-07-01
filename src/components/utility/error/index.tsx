import { ErrorProps } from './error.types';
import { Toast } from '@holdr-ui/react';
import { useEffect, useState } from 'react';

function Error({
  hasError,
  children,
  errorEl: el,
  errorMessage,
}: ErrorProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasError) {
      setOpen(true);
    }
  }, [hasError, setOpen]);

  if (el && hasError) {
    return <>{el}</>;
  }

  //TODO: Change this as there is now a global error

  return (
    <>
      {hasError && errorMessage && !el && (
        <Toast.Item open={open} onOpenChange={setOpen}>
          <Toast.Message
            status='danger'
            description={errorMessage}
            onCloseClick={() => setOpen(false)}
          />
          <Toast.Viewport />
        </Toast.Item>
      )}
      {children}
    </>
  );
}
Error.displayName = 'Error';

export default Error;
