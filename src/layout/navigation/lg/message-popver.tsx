import {
  Box,
  Heading,
  HStack,
  IconButton,
  Popover,
  Text,
} from '@holdr-ui/react';
import { useState } from 'react';
import { useMenuNavigate } from '../../../shared';

function MessagePopover() {
  const [state, set] = useState(false);
  const { goto } = useMenuNavigate();
  return (
    <Popover isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)} asChild>
        <IconButton
          variant='ghost'
          colorTheme='primary400'
          icon='chat-alt-outline'
          ariaLabel='View messages'
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          alignOffset={-90}
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
          <Box
            borderTop={1}
            borderColor='base100'
            position='fixed'
            b={5}
            l={5}
            r={5}
          >
            <HStack
              onClick={() => {
                goto.messages();
                set(false);
              }}
              py={4}
              w='100%'
              justify='center'
            >
              <Text weight={500}>View all</Text>
            </HStack>
          </Box>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
MessagePopover.displayName = 'MessagePopover';

export default MessagePopover;
