import {
  Avatar,
  Box,
  Button,
  Dialog,
  Drawer,
  Heading,
  HStack,
  Icon,
  Popover,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useAlertDialog } from '../../../hooks';
import { useContext, useState } from 'react';
import { extraBtnPadding } from '../../../shared';
import {
  ProfileContext,
  RelationshipStatusContext,
  useProfileContext,
} from '../../../contexts';
import MenuButton from '../menu';
import {
  Responsive,
  ResponsiveItem,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../utility';
import {
  useCreateRelationshipAction,
  useRemoveRelationshipAction,
  useRequestRelationshipAction,
} from '../../../hooks';

function RestrictButton({ close }: { close: VoidFunction }) {
  const { profile } = useContext(ProfileContext);

  const { restrict, loading } = useCreateRelationshipAction(
    profile.username,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Trigger>
        <MenuButton dangerous label='Restrict' icon='close' />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          w={{ '@bp1': '100vw', '@bp3': '90vw' }}
          maxWidth={500}
          h={{ '@bp1': '100vh', '@bp3': 500 }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 4 }}
        >
          <Dialog.Header>
            <Heading as='h2' size={4}>
              Restrict
            </Heading>
          </Dialog.Header>
          <Dialog.Body
            justify={{
              '@bp1': 'space-around',
              '@bp3': 'space-between',
            }}
            items='center'
          >
            <VStack items='center' gap={3}>
              <Avatar src={profile.avatar} size='2xl' />
              <Text size={2} weight={500} color='base500'>
                @{profile.username}
              </Text>
            </VStack>
            <VStack gap={5}>
              <HStack items='center' gap={5}>
                <Icon name='shield-keyhole-fill' size='xl' />
                <Text>
                  Limit interactions without you having to block or
                  unfollow someone.
                </Text>
              </HStack>
              <HStack items='center' gap={5}>
                <Icon name='at' size='xl' />
                <Text>
                  Mentions about yourself from the user will not be visible
                  to you and you will not be notified about them.
                </Text>
              </HStack>
              <HStack items='center' gap={5}>
                <Icon name='send-outline' size='xl' />
                <Text>
                  Their chat will be moved to your hidden messages, so the
                  won&apos;t be able to know when you have read it.
                </Text>
              </HStack>
            </VStack>
            <Box pb={4} w='100%'>
              <Button
                onClick={async () => {
                  await restrict().then(() => {
                    onClose();
                    close(); // close popover
                  });
                }}
                className={extraBtnPadding()}
                fullWidth
                loadingText={loading ? '' : 'Restricting'}
                isLoading={loading}
              >
                Restrict
              </Button>
            </Box>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function FollowingMenu({ close }: { close: VoidFunction }) {
  const { profile } = useContext(ProfileContext);

  const {
    isFriend,
    hasFriendRequest,
    isRestricted,
    isMuted,
    isFavourite,
  } = useContext(RelationshipStatusContext);

  const { unfollow, unmute, removeFavourite } =
    useRemoveRelationshipAction(profile.username);

  const { mute, favourite } = useCreateRelationshipAction(
    profile.username,
  );

  const { friendRequest } = useRequestRelationshipAction(profile.username);

  const { removeFriendRequest, removeFriend, removeRestriction } =
    useRemoveRelationshipAction(profile.username);

  const { open } = useAlertDialog({
    actionText: 'Unfollow',
    onAction: unfollow,
    title: `Unfollow @${profile.username}`,
    description:
      'Their posts will no longer show up in your home feed. You can still view their profile, unless their profile is protected.',
  });

  return (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      <SwitchConditional>
        <SwitchConditionalCase on={!hasFriendRequest && !isFriend}>
          <MenuButton
            label='Add to friends'
            icon='subscriptions-outline'
            onClick={friendRequest}
          />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={!!hasFriendRequest}>
          <MenuButton
            label='Cancel Friend Request'
            icon='subscriptions-outline'
            onClick={removeFriendRequest}
          />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={!!isFriend}>
          <MenuButton
            label='Remove friend'
            icon='subscriptions-fill'
            onClick={removeFriend}
          />
        </SwitchConditionalCase>
      </SwitchConditional>

      <MenuButton
        label={
          isFavourite ? 'Remove from favourites' : 'Add to favourites'
        }
        icon={isFavourite ? 'heart-fill' : 'heart-outline'}
        onClick={isFavourite ? removeFavourite : favourite}
      />

      <MenuButton
        label={isMuted ? 'Unmute' : 'Mute'}
        icon={isMuted ? 'mute-fill' : 'mute-outline'}
        onClick={isMuted ? unmute : mute}
      />

      {isFriend && (
        <SwitchConditional>
          <SwitchConditionalCase on={!isRestricted}>
            <RestrictButton close={close} />
          </SwitchConditionalCase>
          <SwitchConditionalCase on={isRestricted === true}>
            <MenuButton
              onClick={removeRestriction}
              dangerous
              label='Unrestrict'
              icon='check'
            />
          </SwitchConditionalCase>
        </SwitchConditional>
      )}

      {!isFriend && (
        <MenuButton
          dangerous
          onClick={open}
          label='Unfollow'
          icon='user-unfollow-outline'
        />
      )}
    </VStack>
  );
}

function FollowingButton() {
  const { profile } = useProfileContext();
  // const {data, loading, error} = useQuery(GET_RELATIONSHIP_INFO)
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const [openPopover, setOpenPopover] = useState(false);
  const closePopover = () => setOpenPopover(false);

  return (
    <Responsive>
      <ResponsiveItem tablet='show'>
        <Popover isOpen={openPopover} onOpenChange={setOpenPopover}>
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
              <FollowingMenu close={closePopover} />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </ResponsiveItem>
      <ResponsiveItem mobile='show' tablet='show'>
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
                  <Text weight={500}>{profile.displayName}</Text>
                </HStack>
                <FollowingMenu close={closeDrawer} />
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

export default FollowingButton;
