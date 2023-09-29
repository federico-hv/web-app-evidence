import { Fragment, useContext } from 'react';
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
  IProfile,
  RelationshipStatusContext,
  useCreateRelationshipAction,
  useRemoveRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';
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
import { useCurrentUser } from '../../../auth';

function RestrictAccountDialog() {
  const { state: profile } = useGeneralContext<IProfile>();

  const { restrict, loading } = useCreateRelationshipAction();

  const dialogContext = useDialogContext();

  return (
    <CommonDialog {...dialogContext}>
      <CommonDialogHeader label='Restrict' />
      <CommonDialogContent>
        <VStack items='center' gap={3} pb={{ '@bp1': 4, '@bp3': 0 }}>
          <Avatar src={profile.avatar} size='2xl' />
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

function FollowingButton() {
  const { state: profile } = useGeneralContext<IProfile>();
  const currentUser = useCurrentUser();

  const { openWith } = useAlertDialog();
  const disclosure = useDisclosure();

  const {
    isFollowing,
    isFriend,
    hasFriendRequest,
    isRestricted,
    isMuted,
    isFavourite,
  } = useContext(RelationshipStatusContext);

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
            @{profile.username}
          </Heading>
        </MenuHeader>
        <MenuContent>
          {!hasFriendRequest &&
            !isFriend &&
            profile.role === currentUser?.role && (
              <MenuItem
                label='Add to friends'
                icon='subscriptions-outline'
                action={async () => friendRequest(profile.username)}
              />
            )}

          {hasFriendRequest && (
            <MenuItem
              label='Cancel Friend Request'
              icon='subscriptions-outline'
              action={async () => removeFriendRequest(profile.username)}
            />
          )}

          {isFriend && (
            <MenuItem
              label='Remove friend'
              icon='subscriptions-fill'
              action={async () => removeFriend(profile.username)}
            />
          )}

          <MenuItem
            label={
              isFavourite ? 'Remove from favourites' : 'Add to favourites'
            }
            icon={isFavourite ? 'heart-fill' : 'heart-outline'}
            action={
              isFavourite
                ? async () => removeFavourite(profile.username)
                : async () => favourite(profile.username)
            }
          />

          <MenuItem
            label={isMuted ? 'Unmute' : 'Mute'}
            icon={isMuted ? 'mute-fill' : 'mute-outline'}
            action={
              isMuted
                ? async () => unmute(profile.username)
                : async () => mute(profile.username)
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
              action={async () => removeRestriction(profile.username)}
              label='Unrestrict'
              icon='check'
            />
          )}

          {isFollowing && (
            <MenuItem
              dangerous
              action={() =>
                openWith({
                  actionText: 'Unfollow',
                  onAction: async () => unfollow(profile.username),
                  title: `Unfollow @${profile.username}`,
                  description:
                    'Their posts will no longer show up in your home feed. You can still view their profile, unless their profile is protected.',
                })
              }
              label='Unfollow'
              icon='user-unfollow-outline'
            />
          )}
        </MenuContent>
      </Menu>
      <DialogContextProvider value={disclosure}>
        <RestrictAccountDialog />
      </DialogContextProvider>
    </Fragment>
  );
}

export default FollowingButton;
