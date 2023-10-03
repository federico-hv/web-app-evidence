import {
  Avatar,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';

import {
  useCopyToClipboard,
  useGeneralContext,
  MenuTrigger,
  MenuHeader,
  MenuContent,
  Menu,
  MenuItem,
  CommonDialog,
  useDialogContext,
  CommonDialogHeader,
  CommonDialogContent,
  CommonDialogActionButton,
  BlockAccountInfoPoints,
  DialogContextProvider,
} from '../../../../shared';
import { IProfile } from '../../shared';
import {
  useCreateRelationshipAction,
  useCurrentUser,
  useRelationshipStatus,
  useRemoveFollower,
} from '../../../../features';

function BlockAccountDialog() {
  const { state: profile } = useGeneralContext<IProfile>();
  const dialogContext = useDialogContext();

  const { block, loading } = useCreateRelationshipAction();

  return (
    <CommonDialog {...dialogContext}>
      <CommonDialogHeader label='Block' />
      <CommonDialogContent>
        <VStack items='center' gap={3} pb={{ '@bp1': 4, '@bp3': 0 }}>
          <Avatar src={profile.avatar} size='2xl' />
          <Text size={2} weight={500} color='base500'>
            @{profile.username}
          </Text>
        </VStack>
        <VStack gap={{ '@bp1': 5, '@bp3': 4 }}>
          {BlockAccountInfoPoints.map(({ icon, label }, idx) => (
            <HStack
              key={`restriction-item-${idx}`}
              items='center'
              gap={{ '@bp1': 4, '@bp3': 5 }}
            >
              <Icon name={icon} size={{ '@bp1': 'lg', '@bp3': 'xl' }} />
              <Text size={{ '@bp1': 2, '@bp3': 3 }}>{label}</Text>
            </HStack>
          ))}
        </VStack>
      </CommonDialogContent>
      <CommonDialogActionButton
        loading={loading}
        loadingText='Restricting'
        label='Block'
        onClick={async () => {
          await block(profile.username).then(() => {
            dialogContext.onClose();
          });
        }}
      />
    </CommonDialog>
  );
}

function ProfileOptionsButton() {
  const currentUser = useCurrentUser();
  const { state: profile } = useGeneralContext<IProfile>();
  const { isFollower } = useRelationshipStatus();

  const { removeFollower } = useRemoveFollower();

  const copyToClipboard = useCopyToClipboard('Copied link to clipboard.');

  const disclosure = useDisclosure();

  if (currentUser && currentUser.username === profile.username) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <Menu align='start'>
        <MenuTrigger>
          <IconButton
            variant='ghost'
            icon='more-fill'
            ariaLabel='View profile options'
          />
        </MenuTrigger>
        <MenuHeader
          items='center'
          justify='center'
          css={{ userSelect: 'none' }}
        >
          <Heading
            as='h2'
            size={{ '@bp1': 3, '@bp3': 4 }}
            css={{ textAlign: 'center' }}
            weight={500}
          >
            @{profile.username}
          </Heading>
        </MenuHeader>
        <MenuContent>
          <MenuItem
            label='Copy profile URL'
            icon='collections-outline'
            action={() =>
              copyToClipboard(window.location.href).then(close)
            }
          />
          <MenuItem
            label='About this account'
            icon='information-outline'
          />
          {isFollower && (
            <MenuItem
              action={async () => {
                await removeFollower(profile.username);
              }}
              label='Remove follower'
              icon='user-unfollow-outline'
            />
          )}
          <MenuItem
            action={disclosure.onOpen}
            dangerous
            label='Block'
            icon='remove-outline'
          />
        </MenuContent>
      </Menu>
      <DialogContextProvider value={disclosure}>
        <BlockAccountDialog />
      </DialogContextProvider>
    </Fragment>
  );
}
ProfileOptionsButton.displayName = 'ProfileOptionsButton';

export default ProfileOptionsButton;
