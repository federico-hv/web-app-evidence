import { Center, HStack, Heading, IconButton } from '@holdr-ui/react';
import { Menu } from 'shared';

function NotificationHeader() {
  return (
    <HStack justify={'space-between'}>
      <Center>
        <Heading as='h3' size={4} weight={500}>
          Notifications
        </Heading>
      </Center>
      <Menu>
        <Menu.Trigger>
          <IconButton
            ariaLabel='notifications menu'
            variant='ghost'
            icon='more-fill'
            size='base'
          />
        </Menu.Trigger>
        <Menu.Content>{/* TODO */}</Menu.Content>
      </Menu>
    </HStack>
  );
}

NotificationHeader.displayName = 'NotificationHeader';
export default NotificationHeader;
