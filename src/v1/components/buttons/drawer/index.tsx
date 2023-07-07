import { HStack, Icon, Text } from '@holdr-ui/react';
import { DrawerButtonProps } from './drawer.button.types';
import { ButtonActiveOverlay } from '../../overlay';

function DrawerButton({ icon, label, action }: DrawerButtonProps) {
  return (
    <HStack
      role='button'
      position='relative'
      cursor='pointer'
      onClick={action}
      borderBottom={2}
      borderColor='base100'
      items='center'
      gap={4}
      p={4}
    >
      <ButtonActiveOverlay />
      <Icon size='xl' name={icon} />
      <Text weight={500}>{label}</Text>
    </HStack>
  );
}
DrawerButton.displayName = 'DrawerButton';

export default DrawerButton;
