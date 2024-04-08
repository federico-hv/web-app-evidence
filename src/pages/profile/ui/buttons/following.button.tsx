import { Fragment } from 'react';
import {
  Avatar,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  IProfile,
  useCreateRelationshipAction,
  useRelationshipStatus,
  useRemoveRelationshipAction,
  useRequestRelationshipAction,
} from '../../../../features';
import {
  useAlertDialog,
  useGeneralContext,
  Menu,
  MenuTrigger,
  MenuHeader,
  MenuContent,
  MenuItem,
  useDialogContext,
  DialogContextProvider,
  CommonDialogHeader,
  CommonDialog,
  CommonDialogContent,
  CommonDialogActionButton,
  RestrictAccountInfoPoints,
} from '../../../../shared';

function RestrictAccountDialog() {
  const { state: profile } = useGeneralContext<IProfile>();

  const { restrict, loading } = useCreateRelationshipAction();

  const dialogContext = useDialogContext();

  return (
    <CommonDialog {...dialogContext}>
      <CommonDialogHeader label='Restrict' />
      <CommonDialogContent>
        <VStack items='center' gap={3} pb={{ '@bp1': 4, '@bp3': 0 }}>
          <Avatar src={profile.avatar} size='2xl' name={profile.displayName} />
          <Text size={2} weight={500} color='base500'>
            @{profile.username}
          </Text>
        </VStack>
        {RestrictAccountInfoPoints.map(({ icon, label }, idx) => (
          <HStack
            key={`restriction-item-${idx}`}
            items='center'
            gap={{ '@bp1': 4, '@bp3': 5 }}
          >
            <Icon name={icon} size={{ '@bp1': 'lg', '@bp3': 'xl' }} />
            <Text size={{ '@bp1': 2, '@bp3': 3 }}>{label}</Text>
          </HStack>
        ))}
      </CommonDialogContent>
      <CommonDialogActionButton
        loading={loading}
        loadingText='Restricting'
        label='Restrict'
        onClick={async () => {
          await restrict(profile.username).then(() => {
            dialogContext.onClose(); // close the dialog
          });
        }}
      />
    </CommonDialog>
  );
}

interface FollowingButtonProps extends BaseRelationshipButtonProps {
  sameRole: boolean;
}

function FollowingButton({ username, sameRole }: FollowingButtonProps) {
  const { openWith } = useAlertDialog();
  const disclosure = useDisclosure();

  const {
    isFriend,
    hasFriendRequest,
    isRestricted,
    isMuted,
    isFavourite,
  } = useRelationshipStatus();

  const { unfollow, unmute, removeFavourite } =
    useRemoveRelationshipAction();

  const { mute, favourite } = useCreateRelationshipAction();

  const { friendRequest } = useRequestRelationshipAction();

  const { removeFriendRequest, removeFriend, removeRestriction } =
    useRemoveRelationshipAction();

  return (
    <Fragment>
      <Menu align='start'>
        <MenuTrigger>
          <Button rightIcon='caret-down-outline' colorTheme='base800'>
            Following
          </Button>
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
            @{username}
          </Heading>
        </MenuHeader>
        <MenuContent>
          {!hasFriendRequest && !isFriend && sameRole && (
            <MenuItem
              label='Add to friends'
              icon='subscriptions-outline'
              action={async () => friendRequest(username)}
            />
          )}

          {hasFriendRequest && (
            <MenuItem
              label='Cancel Friend Request'
              icon='subscriptions-outline'
              action={async () => removeFriendRequest(username)}
            />
          )}

          {isFriend && (
            <MenuItem
              label='Remove friend'
              icon='subscriptions-fill'
              action={async () => removeFriend(username)}
            />
          )}

          <MenuItem
            label={
              isFavourite ? 'Remove from favourites' : 'Add to favourites'
            }
            icon={isFavourite ? 'heart-fill' : 'heart-outline'}
            action={
              isFavourite
                ? async () => removeFavourite(username)
                : async () => favourite(username)
            }
          />

          <MenuItem
            label={isMuted ? 'Unmute' : 'Mute'}
            icon={isMuted ? 'mute-fill' : 'mute-outline'}
            action={
              isMuted
                ? async () => unmute(username)
                : async () => mute(username)
            }
          />

          {isFriend && (
            <MenuItem
              action={disclosure.onOpen}
              dangerous
              label='Restrict'
              icon='close'
            />
          )}

          {isFriend && isRestricted && (
            <MenuItem
              action={async () => removeRestriction(username)}
              label='Unrestrict'
              icon='check'
            />
          )}

          <MenuItem
            dangerous
            action={() =>
              openWith({
                actionText: 'Unfollow',
                onAction: async () => unfollow(username),
                title: `Unfollow @${username}`,
                description:
                  'Their posts will no longer show up in your home feed. You can still view their profile, unless their profile is protected.',
              })
            }
            label='Unfollow'
            icon='user-unfollow-outline'
          />
        </MenuContent>
      </Menu>
      <DialogContextProvider value={disclosure}>
        <RestrictAccountDialog />
      </DialogContextProvider>
    </Fragment>
  );
}

export default FollowingButton;
