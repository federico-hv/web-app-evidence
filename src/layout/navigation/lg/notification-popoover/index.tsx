import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Popover,
  Text,
  Tabs,
  useKeyBind,
  VStack,
  Button,
} from '@holdr-ui/react';
import {
  dummyFn,
  EmptyMessage,
  GeneralContextProvider,
  Loader,
  Menu,
  Paths,
  useGeneralContext,
} from '../../../../shared';
import { useState } from 'react';
import { Notification, useNotification } from '../../../../features';
import { Link } from 'react-router-dom';

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
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger onClick={() => setIsOpen(true)}>
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
          css={{ backgroundColor: '#fff' }}
        >
          <GeneralContextProvider
            value={{ state: { isOpen, onClose, onOpen }, update: dummyFn }}
          >
            <VStack
              gap={3}
              divider={<Box borderBottom={1} borderColor='base100' />}
            >
              <HStack px={4} justify='space-between' items='center'>
                <Heading as='h3' size={4} weight={500}>
                  Notifications
                </Heading>
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
              <Tabs defaultValue='all'>
                <Tabs.List
                  gap={3}
                  css={{
                    px: '$4',
                    py: '$2',
                    '& > *': {
                      boxShadow: 'none',
                      backgroundColor: '#fff',
                    },
                  }}
                >
                  <Tabs.Trigger value='all'>All</Tabs.Trigger>
                  <Tabs.Trigger value='holdr-club'>
                    Holdr Club
                  </Tabs.Trigger>
                  <Tabs.Trigger value='requests'>Requests</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value='all'>
                  <AllTab />
                </Tabs.Content>
                <Tabs.Content value='holdr-club'>
                  <HoldrClubTab />
                </Tabs.Content>
                <Tabs.Content value='requests'>
                  <RequestsTab />
                </Tabs.Content>
              </Tabs>
            </VStack>
          </GeneralContextProvider>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
NotificationPopover.displayName = 'NotificationPopover';

function AllTab() {
  const { data } = useNotification('relationship');

  const { state } = useGeneralContext<INotificationContext>();

  return (
    <Loader loading={false}>
      <VStack py={3}>
        <HStack items='center' px={4} pb={4} justify='space-between'>
          <Text weight={500}>New</Text>
          <Link to={Paths.notifications} onClick={state.onClose}>
            <Text
              color='base400'
              size={2}
              css={{ textDecoration: 'underline' }}
            >
              View All
            </Text>
          </Link>
        </HStack>
        {data.map((notification, idx) => (
          <Notification
            key={idx}
            data={notification}
            onClick={state.onClose}
          />
        ))}
      </VStack>
    </Loader>
  );
}

function HoldrClubTab() {
  return (
    <Loader loading={false}>
      <Box mt={4}>
        <EmptyMessage
          title='Nothing to display'
          subtitle='You do not have any new Holdr club notifications'
        />
      </Box>
    </Loader>
  );
}

function RequestsTab() {
  return (
    <Loader loading={false}>
      <Box mt={4}>
        <EmptyMessage
          title='Nothing to display'
          subtitle='You do not have any new friend or follow requests'
        />
      </Box>
    </Loader>
  );
}

export default NotificationPopover;
