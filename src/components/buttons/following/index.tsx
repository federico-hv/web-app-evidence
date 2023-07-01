import { IconName } from '@holdr-ui/react/dist/shared/types';
import {
  Box,
  Button,
  Drawer,
  HStack,
  Icon,
  Popover,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useAlertDialog, useUsername } from '../../../hooks';
import { useContext, useEffect } from 'react';
import {
  useCreateRelationship,
  useRemoveRelationship,
} from '../../../lib';
import { extraBtnPadding } from '../../../shared';
import { RelationshipStatusContext } from '../../../contexts';

interface MenuItemProps {
  dangerous?: boolean;
  label: string;
  icon: IconName;
  onClick?: VoidFunction;
}

export function MenuItem({
  label,
  icon,
  onClick,
  dangerous,
}: MenuItemProps) {
  return (
    <HStack
      justify='space-between'
      items='center'
      radius={2}
      cursor='pointer'
      p={4}
      color={dangerous ? 'danger' : 'base800'}
      _hover={{
        backgroundColor: dangerous ? 'rgba(255,205,205,0.38)' : '$base100',
      }}
      onClick={onClick}
    >
      <Text weight={500}>{label}</Text>
      <Icon name={icon} />
    </HStack>
  );
}

function useCreateRelationshipAction(username: string) {
  const { createRelationship } = useCreateRelationship();

  const mute = () => createRelationship({ username, action: 'mute' });
  const favourite = () =>
    createRelationship({ username, action: 'favourite' });

  return { mute, favourite };
}

function useRemoveRelationshipAction(username: string) {
  const { removeRelationship } = useRemoveRelationship();

  const unfollow = () =>
    removeRelationship({ username, action: 'follow' });
  const unmute = () => removeRelationship({ username, action: 'mute' });
  const removeFavourite = () =>
    removeRelationship({ username, action: 'favourite' });

  return { unfollow, unmute, removeFavourite };
}

function FollowingMenu() {
  const username = useUsername();
  const { open, isOpen, set } = useAlertDialog();
  const { isMuted, isFavourite } = useContext(RelationshipStatusContext);

  const { unfollow, unmute, removeFavourite } =
    useRemoveRelationshipAction(username);
  const { mute, favourite } = useCreateRelationshipAction(username);

  useEffect(() => {
    if (isOpen && set)
      set({
        actionText: 'Unfollow',
        onAction: unfollow,
        title: `Unfollow @${username}`,
        description:
          'Their posts will no longer show up in your home feed. You can still view their profile, unless their profile is protected.',
      });
  }, [isOpen, username, set]);

  return (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      <MenuItem label='Add to friends' icon='subscriptions-outline' />
      <MenuItem
        label={
          isFavourite ? 'Remove from favourites' : 'Add to favourites'
        }
        icon={isFavourite ? 'heart-fill' : 'heart-outline'}
        onClick={isFavourite ? removeFavourite : favourite}
      />
      <MenuItem
        label={isMuted ? 'Unmute' : 'Mute'}
        icon={isMuted ? 'mute-fill' : 'mute-outline'}
        onClick={isMuted ? unmute : mute}
      />
      <MenuItem dangerous label='Restrict' icon='close' />
      <MenuItem
        dangerous
        onClick={open}
        label='Unfollow'
        icon='user-unfollow-outline'
      />
    </VStack>
  );
}

function FollowingButton() {
  const username = useUsername();
  // const {data, loading, error} = useQuery(GET_RELATIONSHIP_INFO)
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  // Use fixed menu
  return (
    <>
      {/* The following should actually be a component in itself. possibly called ResponsiveMenu*/}
      {/* SC: Trigger, Header, Body, */}
      <Box display={{ '@bp1': 'none', '@bp3': 'block' }}>
        <Popover>
          <Popover.Trigger>
            <Button rightIcon='caret-down-outline' colorTheme='primary400'>
              Following
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              minWidth={275}
              side='bottom'
              align='end'
              sideOffset={5}
            >
              <FollowingMenu />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </Box>
      <Box display={{ '@bp1': 'block', '@bp3': 'none' }}>
        <Button
          onClick={openDrawer}
          rightIcon='caret-down-outline'
          colorTheme='primary400'
        >
          Following
        </Button>
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
                <HStack justify='center' p={4}>
                  <Text weight={500}>@{username}</Text>
                </HStack>
                <FollowingMenu />
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
      </Box>
    </>
  );
}

export default FollowingButton;
