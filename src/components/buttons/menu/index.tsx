import { HStack, Icon, Text } from '@holdr-ui/react';
import { MenuButtonProps } from './menu-button.types';

function MenuButton({ label, icon, onClick, dangerous }: MenuButtonProps) {
  return (
    <HStack
      justify='space-between'
      role='button'
      items='center'
      radius={2}
      cursor='pointer'
      p={4}
      color={dangerous ? 'danger' : 'base800'}
      _hover={{
        backgroundColor: dangerous ? 'rgba(255,205,205,0.38)' : '$base100',
      }}
      onClick={onClick}
    >
      <Text weight={500}>{label}</Text>
      <Icon name={icon} size='lg' />
    </HStack>
  );
}
MenuButton.displayName = 'MenuButton';

export default MenuButton;
