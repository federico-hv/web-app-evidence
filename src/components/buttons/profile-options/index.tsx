import {
  Box,
  Button,
  Drawer,
  IconButton,
  Popover,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useContext } from 'react';
import { RelationshipStatusContext } from '../../../contexts';
import { useCopyToClipboard } from '../../../hooks';
import MenuButton from '../menu';
import { Responsive, ResponsiveItem } from '../../utility';
import { extraBtnPadding } from '../../../shared';

function ProfileOptionsMenu() {
  const copyToClipboard = useCopyToClipboard('Copied link to clipboard.');
  const { isFollower } = useContext(RelationshipStatusContext);
  return (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      <MenuButton dangerous label='Block' icon='remove-outline' />
      <MenuButton dangerous label='Report' icon='report-outline' />
      {isFollower && (
        <MenuButton label='Remove follower' icon='user-unfollow-outline' />
      )}
      <MenuButton
        label='Copy profile URL'
        icon='collections-outline'
        onClick={() => copyToClipboard(window.location.href)}
      />
      <MenuButton label='About this account' icon='information-outline' />
    </VStack>
  );
}

function ProfileOptionsButton() {
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();
  return (
    <Responsive>
      <ResponsiveItem tablet='show'>
        <Popover>
          <Popover.Trigger>
            <IconButton
              variant='ghost'
              colorTheme='primary400'
              icon='more-fill'
              ariaLabel='open profile options'
            />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              minWidth={275}
              side='bottom'
              align='end'
              sideOffset={5}
            >
              <ProfileOptionsMenu />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </ResponsiveItem>
      <ResponsiveItem mobile='show' tablet='show'>
        <IconButton
          onClick={openDrawer}
          variant='ghost'
          colorTheme='base800'
          icon='more-fill'
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
                h='390px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <ProfileOptionsMenu />
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
ProfileOptionsButton.displayName = 'ProfileOptionsButton';

export default ProfileOptionsButton;
