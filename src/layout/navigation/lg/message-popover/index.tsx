import {
  Box,
  Heading,
  HStack,
  IconButton,
  Popover,
  Text,
} from '@holdr-ui/react';
import { useState } from 'react';
import { customBgColor, useMenuNavigate } from '../../../../shared';

function MessagePopover() {
  const [state, set] = useState(false);
  const { goto } = useMenuNavigate();
  return (
    <Popover modal isOpen={state} onOpenChange={set}>
      <Popover.Trigger asChild onClick={() => set(true)}>
        <IconButton
          className={customBgColor()}
          variant='ghost'
          colorTheme='white50'
          icon='chat-outline'
          ariaLabel='View messages'
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          color='white50'
          alignOffset={-50}
          sideOffset={20}
          align='end'
          h='calc(98.5vh - 68px)'
          w={400}
          zIndex={50}
          css={{
            borderRadius: '$4',
            border: '1px solid rgba(152, 152, 255, 0.10)',
            background: ' rgba(56, 56, 140, 0.25)',
            boxShadow: '0px 0px 100px 0px rgba(14, 14, 27, 0.35)',
            backdropFilter: 'blur(50px)',
          }}
        >
          <Box
            px={3}
            py={3}
            css={{ borderBottom: '1px solid rgba(152, 152, 255, 0.10)' }}
          >
            <Heading as='h4' size={4} weight={500}>
              Messages
            </Heading>
          </Box>
          <Box
            css={{ borderTop: '1px solid rgba(152, 152, 255, 0.10)' }}
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
