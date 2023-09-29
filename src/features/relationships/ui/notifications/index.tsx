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

/*
TODO:
 -[ ] Move to /features/notifications/ui
 -[ ] Use in pages/profile, separate it from the previous architecture
 */

function NotificationSettings() {
  return (
    <VStack
      flex={1}
      divider={<Box borderBottom={1} borderColor='base100' />}
    >
      <HStack p={4} justify='space-between'>
        <Text>Posts</Text>
        <Switch />
      </HStack>
      <HStack p={4} justify='space-between'>
        <Text>Releases</Text>
        <Switch />
      </HStack>
      <HStack p={4} justify='space-between'>
        <Text>Events</Text>
        <Switch />
      </HStack>
      <VStack p={4} justify='center' color='base400'>
        <HStack gap={4}>
          <Icon name='information-outline' />
          <Text size={2}>
            Get notifications whenever user shares new feeds, events and
            music releases
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

function NotificationsButton() {
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();
  return (
    <Responsive>
      <ResponsiveItem tablet='hide'>
        <Dialog>
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
                    casing='uppercase'
                    weight={500}
                  >
                    Notifications
                  </Heading>
                </Center>
                <NotificationSettings />
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
                bgColor='primary400'
                w='full'
                h='380px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <Center p={4} borderBottom={1} borderColor='base100'>
                  <Text weight={500}>Notifications</Text>
                </Center>
                <NotificationSettings />
                <VStack flex={1} px={4} justify='center'>
                  <Button
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
NotificationsButton.displayName = 'NotificationsButton';

export default NotificationsButton;
