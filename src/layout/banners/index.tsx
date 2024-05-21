import { GenericProps, GQLRenderer } from '../../shared';
import { VStack } from '@holdr-ui/react';

function Banners({ children }: GenericProps) {
  // Custom styling may occur here

  return (
    <GQLRenderer>
      <VStack gap={2}>{children}</VStack>
    </GQLRenderer>
  );
}

export default Banners;
