import { HStack } from '@holdr-ui/react';
import { GenericProps } from '../../interfaces';

// TODO Deprecate

function ActionItemWrapper({ children }: GenericProps) {
  return (
    <HStack
      gap={3}
      p={4}
      w='100%'
      h='100%'
      radius={2}
      cursor='pointer'
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
