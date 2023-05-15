import { HStack } from '@holdr-ui/react';
import { ActionWrapperProps } from './profile-card.type';

export function ActionWrapper({ children }: ActionWrapperProps) {
  return (
    <HStack
      py={4}
      px={3}
      role='button'
      items='center'
      justify='space-between'
      radius={2}
      cursor='pointer'
      _hover={{
        background: '$base100',
      }}
    >
      {children}
    </HStack>
  );
}
