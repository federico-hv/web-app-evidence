import {
  Box,
  Heading,
  HStack,
  IconButton,
  Popover,
  Tabs,
  Text,
} from '@holdr-ui/react';
import { useState } from 'react';
import { ActionItemWrapper } from '../../../shared';

function NotificationPopover() {
  const [state, set] = useState(false);
  return (
    <Popover isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)}>
        <IconButton
          colorTheme='primary400'
          icon='notification-outline'
          ariaLabel='View notifications'
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          alignOffset={-50}
          sideOffset={20}
          align='end'
          h='calc(98.5vh - 68px)'
          w={400}
          zIndex={50}
        >
          <Box px={3} py={3} borderBottom={1} borderColor='base100'>
            <Heading as='h4' size={4} weight={500}>
              Notifications
            </Heading>
          </Box>
          <Box pt={3}>
            <Tabs defaultValue='all'>
              <Tabs.List
                gap={3}
                css={{
                  py: '$3',
                  px: '$1',
                }}
              >
                <Tabs.Trigger value='all'>All</Tabs.Trigger>
                <Tabs.Trigger value='requests'>Requests</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value='all'></Tabs.Content>
              <Tabs.Content value='mentions'></Tabs.Content>
            </Tabs>
          </Box>
          <Box
            borderTop={1}
            borderColor='base100'
            position='fixed'
            b={5}
            l={5}
            r={5}
          >
            <ActionItemWrapper>
              <HStack py={3} w='100%' justify='center'>
                <Text weight={500}>View all</Text>
              </HStack>
            </ActionItemWrapper>
          </Box>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationPopover.displayName = 'NotificationPopover';

export default NotificationPopover;
