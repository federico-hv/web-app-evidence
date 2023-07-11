import { Box, Heading, IconButton, Popover, Tabs } from '@holdr-ui/react';
import { useState } from 'react';

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
          alignOffset={-60}
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
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationPopover.displayName = 'NotificationPopover';

export default NotificationPopover;
