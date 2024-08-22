import {
  Box,
  Heading,
  HStack,
  IconButton,
  Popover,
  Text,
  Tabs,
  useKeyBind,
  VStack,
  Avatar,
} from '@holdr-ui/react';
import {
  dummyFn,
  EmptyMessage,
  GeneralContextProvider,
  Loader,
  Menu,
  Paths,
  customBgColor,
  useGeneralContext,
} from '../../../../shared';
import { useState } from 'react';
import { Notification, useNotification } from '../../../../features';
import { Link, useNavigate } from 'react-router-dom';
import { hexToRGB } from '../../../../shared';

interface INotificationContext {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  // close with ESC key
  useKeyBind(27, () => {
    setIsOpen(false);
  });

  return (
    <Popover modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <IconButton
          className={customBgColor()}
          variant='ghost'
          colorTheme='white50'
          icon='notification-outline'
          ariaLabel='View notifications'
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          color='white50'
          alignOffset={-52}
          sideOffset={20}
          align='end'
          h='calc(98.5vh - 68px)'
          w={400}
          zIndex={50}
          radius={2}
          p={4}
          border={1}
          borderColor='rgba(152, 152, 255, 0.10)'
          bgColor=' rgba(56, 56, 140, 0.25)'
          css={{
            boxShadow: '0px 0px 100px 0px rgba(14, 14, 27, 0.35)',
            backdropFilter: 'blur(50px)',
          }}
        >
          <GeneralContextProvider
            value={{ state: { isOpen, onClose, onOpen }, update: dummyFn }}
          >
            <VStack
              gap={5}
              divider={
                <Box
                  css={{
                    borderTop: '1px solid rgba(152, 152, 255, 0.10)',
                  }}
                />
              }
            >
              <Heading as='h3' size={5} weight={500}>
                Notifications
              </Heading>
              <Text color='white700' as='em'>
                All new notifications will appear here
              </Text>
            </VStack>
          </GeneralContextProvider>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationPopover.displayName = 'NotificationPopover';

export default NotificationPopover;
