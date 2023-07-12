import { HStack } from '@holdr-ui/react';
import { GenericProps } from '../../interfaces';

function ActionItemWrapper({ children }: GenericProps) {
  return (
    <HStack
      gap={3}
      px={3}
      py={4}
      radius={2}
      items='center'
      _hover={{ backgroundColor: '$base100' }}
      position='relative'
    >
      {children}
    </HStack>
  );
}

ActionItemWrapper.displayName = 'ActionItemWrapper';

export default ActionItemWrapper;
