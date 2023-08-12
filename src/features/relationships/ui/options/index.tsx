import {
  Avatar,
  Box,
  Button,
  Dialog,
  Drawer,
  Heading,
  HStack,
  Icon,
  IconButton,
  Popover,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useContext, useEffect, useState } from 'react';
import {
  RelationshipStatusContext,
  useCreateRelationshipAction,
  useRemoveFollower,
} from '../../shared';
import {
  MenuButton,
  Responsive,
  ResponsiveItem,
  SwitchConditional,
  SwitchConditionalCase,
  extraBtnPadding,
  useCopyToClipboard,
  useProfile,
  useProfileContext,
  useToast,
} from '../../../../shared';

function BlockButton({ close }: { close: VoidFunction }) {
  const { profile } = useProfile();

  const { block, loading } = useCreateRelationshipAction();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Trigger>
        <MenuButton dangerous label='Block' icon='remove-outline' />
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
              Block
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
                <Icon name='user-unfollow-outline' size='xl' />
                <Text>
                  The user will not be able to follow you or view your
                  content on Holdr.
                </Text>
              </HStack>
              <HStack items='center' gap={5}>
                <Icon name='notification-outline' size='xl' />
                <Text>
                  The user will not be notified that they have been
                  blocked.
                </Text>
              </HStack>
              <HStack items='center' gap={5}>
                <Icon name='settings-outline' size='xl' />
                <Text>
                  You can unblock the user anytime by going to your
                  Settings.
                </Text>
              </HStack>
            </VStack>
            <Box pb={4} w='100%'>
              <Button
                onClick={async () => {
                  await block(profile.username).then(() => {
                    onClose();
                    close();
                  });
                }}
                className={extraBtnPadding()}
                fullWidth
                loadingText={loading ? '' : 'Blocking'}
                isLoading={loading}
              >
                Block
              </Button>
            </Box>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function ProfileOptionsMenu({ close }: { close: VoidFunction }) {
  const { profile } = useProfileContext();
  const { isFollower, isBlocked } = useContext(RelationshipStatusContext);
  const copyToClipboard = useCopyToClipboard('Copied link to clipboard.');
  const { removeFollower, error } = useRemoveFollower();

  const { openWith } = useToast();

  useEffect(() => {
    if (error) {
      openWith({
        description:
          error.message ||
          'Oops! Something went wrong. Totally our fault, but try again later.',
        status: 'danger',
      });
    }
  }, [error, openWith]);

  return (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      <MenuButton dangerous label='Report' icon='report-outline' />
      <SwitchConditional>
        <SwitchConditionalCase on={!isBlocked}>
          <BlockButton close={close} />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={isBlocked === true}>
          <MenuButton label='Unblock' icon='add' />
        </SwitchConditionalCase>
      </SwitchConditional>
      {isFollower && (
        <MenuButton
          onClick={async () => {
            await removeFollower(profile.username);
          }}
          label='Remove follower'
          icon='user-unfollow-outline'
        />
      )}
      <MenuButton
        label='Copy profile URL'
        icon='collections-outline'
        onClick={() => copyToClipboard(window.location.href).then(close)}
      />
      <MenuButton label='About this account' icon='information-outline' />
    </VStack>
  );
}

function OptionsButton() {
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const [openPopover, setOpenPopover] = useState(false);
  const closePopover = () => setOpenPopover(false);

  return (
    <Responsive>
      <ResponsiveItem tablet='hide'>
        <Popover isOpen={openPopover} onOpenChange={setOpenPopover}>
          <Popover.Trigger>
            <IconButton
              variant='ghost'
              colorTheme='base800'
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
              zIndex={50}
            >
              <ProfileOptionsMenu close={closePopover} />
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
                h='300px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <ProfileOptionsMenu close={closeDrawer} />
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
OptionsButton.displayName = 'OptionsButton';

export default OptionsButton;
