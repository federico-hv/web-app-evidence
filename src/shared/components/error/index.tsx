import { ErrorProps } from './types';
import { Alert, VStack } from '@holdr-ui/react';

function Error({
  hasError,
  errorEl: el,
  errorMessage,
  children,
}: ErrorProps) {
  if (el && hasError) {
    return <>{el}</>;
  }

  return (
    <VStack gap={3}>
      {errorMessage && (
        <Alert status='error'>
          <Alert.Description>{errorMessage}</Alert.Description>
        </Alert>
      )}
      {children}
    </VStack>
  );
}
Error.displayName = 'Error';

export default Error;
