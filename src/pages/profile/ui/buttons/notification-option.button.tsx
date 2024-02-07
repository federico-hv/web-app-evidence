import {
  Box,
  Button,
  Center,
  Dialog,
  Drawer,
  Heading,
  HStack,
  Icon,
  IconButton,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import {
  Responsive,
  ResponsiveItem,
  extraBtnPadding,
} from '../../../../shared';

function NotificationOptions() {
  return (
    <VStack
      flex={1}
      divider={<Box borderBottom={1} borderColor='base100' />}
    >
      <HStack p={4} justify='space-between'>
        <Text size={{ '@bp1': 2, '@bp3': 3 }}>Posts</Text>
        <Switch size={{ '@bp1': 'sm', '@bp3': 'base' }} />
      </HStack>
      <HStack p={4} justify='space-between'>
        <Text size={{ '@bp1': 2, '@bp3': 3 }}>Releases</Text>
        <Switch size={{ '@bp1': 'sm', '@bp3': 'base' }} />
      </HStack>
      <HStack p={4} justify='space-between'>
        <Text size={{ '@bp1': 2, '@bp3': 3 }}>Events</Text>
        <Switch size={{ '@bp1': 'sm', '@bp3': 'base' }} />
      </HStack>
      <VStack p={4} justify='center' color='base400'>
        <HStack gap={4}>
          <Icon name='information-outline' />
          <Text size={{ '@bp1': 1, '@bp3': 2 }}>
            Get notifications whenever user shares new feeds, events and
            music releases
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

function NotificationOptionButton() {
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();
  return (
    <Responsive>
      <ResponsiveItem tablet='hide'>
        <Dialog ariaDescribedBy=''>
          <Dialog.Trigger>
            <IconButton
              size={{ '@bp1': 'sm', '@bp3': 'base' }}
              colorTheme='base800'
              icon='notification-outline'
              ariaLabel='open profile options'
            />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content w={400} h={300}>
              <Dialog.Body css={{ padding: 0 }}>
                <Center p={5} borderBottom={1} borderColor='base100'>
                  <Heading
                    as='h2'
                    size={{ '@bp1': 3, '@bp3': 4 }}
                    css={{ textAlign: 'center' }}
                    weight={500}
                  >
                    Notifications
                  </Heading>
                </Center>
                <NotificationOptions />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </ResponsiveItem>
      <ResponsiveItem mobile='show' tablet='show'>
        <IconButton
          onClick={openDrawer}
          colorTheme='base800'
          icon='notification-outline'
          ariaLabel='open profile options'
        />
        <Drawer isOpen={drawerOpen} onClose={closeDrawer}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <VStack
                radius={3}
                w='full'
                minHeight='1px'
                divider={<Box borderBottom={1} borderColor='base100' />}
                css={{ backgroundColor: '#fff' }}
              >
                <HStack justify='center' items='center' minHeight={40}>
                  <Text weight={500}>Notifications</Text>
                </HStack>
                <NotificationOptionButton />
                <VStack px={4} py={4} flex={1} justify='center'>
                  <Button
                    size={{ '@bp1': 'sm', '@bp3': 'base' }}
                    className={extraBtnPadding()}
                    fullWidth
                    onClick={closeDrawer}
                  >
                    Close
                  </Button>
                </VStack>
              </VStack>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer>
      </ResponsiveItem>
    </Responsive>
  );
}
NotificationOptionButton.displayName = 'NotificationOptionButton';

export default NotificationOptionButton;
