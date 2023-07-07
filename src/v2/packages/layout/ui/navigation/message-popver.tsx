import { Box, Heading, IconButton, Popover } from '@holdr-ui/react';
import { useState } from 'react';

function MessagePopover() {
  const [state, set] = useState(false);
  return (
    <Popover isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)}>
        <IconButton
          colorTheme='primary400'
          icon='chat-alt-outline'
          ariaLabel='View messages'
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
              Messages
            </Heading>
          </Box>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
MessagePopover.displayName = 'MessagePopover';

export default MessagePopover;
