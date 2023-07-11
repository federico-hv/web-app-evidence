import {
  Box,
  Button,
  Drawer,
  HStack,
  Popover,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useRemoveRelationshipAction } from '../../shared';
import {
  MenuButton,
  Responsive,
  ResponsiveItem,
  useProfile,
  extraBtnPadding,
} from '../../../../shared';

function RequestedButton() {
  const { profile } = useProfile();

  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const { removeFollowRequest } = useRemoveRelationshipAction(
    profile.username,
  );

  const Menu = () => (
    <>
      <MenuButton
        onClick={removeFollowRequest}
        dangerous
        label='Cancel Request'
        icon='remove-outline'
      />
    </>
  );

  return (
    <Responsive>
      <ResponsiveItem tablet='show'>
        <Popover>
          <Popover.Trigger>
            <Button colorTheme='base100' rightIcon='caret-down-outline'>
              Requested
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              minWidth={275}
              side='bottom'
              align='end'
              sideOffset={5}
            >
              <Menu />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </ResponsiveItem>
      <ResponsiveItem mobile='show' tablet='show'>
        <Button
          onClick={openDrawer}
          colorTheme='base100'
          rightIcon='caret-down-outline'
        >
          Requested
        </Button>
        <Drawer isOpen={drawerOpen} onClose={closeDrawer}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <VStack
                radius={3}
                bgColor='primary400'
                w='full'
                h='200px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <HStack justify='center' p={4}>
                  <Text weight={500}>{profile.displayName}</Text>
                </HStack>
                <Menu />
                <VStack px={4} flex={1} justify='center'>
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
RequestedButton.displayName = 'RequestedButton';
export default RequestedButton;
