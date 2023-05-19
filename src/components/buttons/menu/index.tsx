import { HStack, Icon, Text } from '@holdr-ui/react';
import { MenuButtonProps } from './menu-button.types';

function MenuButton({ label, icon, onClick }: MenuButtonProps) {
  return (
    <HStack
      py={4}
      px={3}
      role='button'
      items='center'
      justify='space-between'
      radius={2}
      onClick={onClick}
      cursor='pointer'
      _hover={{
        background: '$base100',
      }}
    >
      <Text>{label}</Text>
      <Icon name={icon} size='lg' />
    </HStack>
  );
}
MenuButton.displayName = 'MenuButton';

export default MenuButton;
