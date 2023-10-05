import { Fragment, useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  HStack,
  Tabs,
  Text,
  useWindowSize,
  VStack,
} from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  DialogTabContextProvider,
  EmptyMessage,
  Error,
  ErrorFallback,
  GQLRenderer,
  Loader,
  TextGroup,
  TextGroupSubheading,
  useDialogTabContext,
  useGeneralContext,
  UserNamesGroup,
  voidFn,
} from '../../../../shared';
import { useParams } from 'react-router-dom';
import {
  GET_RELATIONSHIP_COUNT,
  useRelationshipUsers,
  useCurrentUser,
  QueryType,
  useRelationshipStatus,
  UserWithRelationshipAction,
} from '../../../../features';
import {
  getMutualFollowersText,
  IProfile,
  useCanViewProfile,
} from '../../shared';
import millify from 'millify';

function RelationshipSummary() {
  const { username } = useParams();

  const { onOpen } = useDialogTabContext();

  const { loading, data, error } = useQuery<{
    followers: { total: number };
    following: { total: number };
  }>(GET_RELATIONSHIP_COUNT, {
    variables: { username },
  });

  return (
    <Error hasError={!!error} errorEl={<></>}>
      <Loader h={90} loading={loading}>
        {data && (
          <HStack gap={{ '@bp1': 3, '@bp3': 0 }}>
            <TextGroup
              w={{ '@bp1': 'fit-content', '@bp3': '100%' }}
              onClick={() => onOpen('followers')}
              direction={{ '@bp1': 'horizontal', '@bp3': 'vertical' }}
              gap={{ '@bp1': 2, '@bp3': 1 }}
            >
              <TextGroupSubheading
                size={{ '@bp1': 2, '@bp3': 5 }}
                weight={600}
              >
                {millify(data.followers.total)}
              </TextGroupSubheading>
              <TextGroupSubheading
                size={{ '@bp1': 2, '@bp3': 3 }}
                weight={500}
                color='base400'
              >
                Followers
              </TextGroupSubheading>
            </TextGroup>
            <TextGroup
              w={{ '@bp1': 'fit-content', '@bp3': '100%' }}
              onClick={() => onOpen('following')}
              direction={{ '@bp1': 'horizontal', '@bp3': 'vertical' }}
              gap={{ '@bp1': 2, '@bp3': 1 }}
            >
              <TextGroupSubheading
                size={{ '@bp1': 2, '@bp3': 5 }}
                weight={600}
              >
                {millify(data.following.total)}
              </TextGroupSubheading>
              <TextGroupSubheading
                size={{ '@bp1': 2, '@bp3': 3 }}
                weight={500}
                color='base400'
              >
                Following
              </TextGroupSubheading>
            </TextGroup>
          </HStack>
        )}
      </Loader>
    </Error>
  );
}

function MutualFollowers() {
  const { username } = useParams();

  const { onOpen } = useDialogTabContext();

  const data = useRelationshipUsers('mutualUsers', username || '');

  return (
    <Fragment>
      {data.users.length > 0 && (
        <HStack
          onClick={() => onOpen('mutual')}
          mt={5}
          items='center'
          gap={3}
        >
          <AvatarGroup size='xs'>
            {data.users.map((item) => (
              <Avatar
                key={`avatar-${item.id}`}
                name={item.displayName}
                src={item.avatar}
              />
            ))}
          </AvatarGroup>
          <Box
            w='calc(100%-70px)'
            title='Slim Jackson, Key Manko & 76 others follow this
                          artist'
          >
            <Text size={1} noOfLines={1}>
              {getMutualFollowersText(data.users || [], data.total)}
            </Text>
          </Box>
        </HStack>
      )}
    </Fragment>
  );
}

const RelationshipMessage: Record<
  QueryType,
  { title: string; subtitle: string }
> = {
  mutualUsers: {
    title: 'No mutual users',
    subtitle: 'is not followed by accounts that you follow.',
  },
  followers: {
    title: 'No followers',
    subtitle: 'is not followed by any account.',
  },
  following: {
    title: 'No mutual users',
    subtitle: 'is not following any account.',
  },
};

function RelationshipList({ type }: { type: QueryType }) {
  const { username } = useParams();

  const { onClose } = useDialogTabContext();

  const data = useRelationshipUsers(type, username || '');

  return (
    <Fragment>
      {data.users.length > 0 ? (
        <VStack gap={{ '@bp1': 4, '@bp3': 4 }}>
          {data.users.map((item) => (
            <UserWithRelationshipAction
              onClose={onClose}
              key={item.id}
              data={item}
            />
          ))}
        </VStack>
      ) : (
        <EmptyMessage
          title={RelationshipMessage[type].title}
          subtitle={`@${username} ${RelationshipMessage[type].subtitle}`}
        />
      )}
    </Fragment>
  );
}

function RelationshipDialog() {
  const { width } = useWindowSize();
  const { state: profile } = useGeneralContext<IProfile>();
  const currentUser = useCurrentUser();

  const { option, ...dialogContext } = useDialogTabContext();

  return (
    <CommonDialog {...dialogContext} onOpen={voidFn}>
      {width && width < 768 && (
        <CommonDialogHeader justify='flex-start'>
          <UserNamesGroup
            displayName={profile.displayName}
            username={profile.username}
          />
        </CommonDialogHeader>
      )}

      <CommonDialogContent>
        <GQLRenderer ErrorFallback={ErrorFallback}>
          <Tabs defaultValue={option}>
            <Tabs.List
              css={{
                py: '0',
                '& button': { height: '$7', minWidth: 'unset', flex: 1 },
              }}
              variant='link'
            >
              <Tabs.Trigger value='followers'>
                <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
                  Followers
                </Text>
              </Tabs.Trigger>
              <Tabs.Trigger value='following'>
                <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
                  Following
                </Text>
              </Tabs.Trigger>
              {currentUser &&
                profile.username !== currentUser.username && (
                  <Tabs.Trigger value='mutual'>
                    <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
                      Mutual
                    </Text>
                  </Tabs.Trigger>
                )}
            </Tabs.List>
            <Tabs.Content value='followers'>
              <RelationshipList type='followers' />
            </Tabs.Content>
            <Tabs.Content value='following'>
              <RelationshipList type='following' />
            </Tabs.Content>
            {currentUser && profile.username !== currentUser.username && (
              <Tabs.Content value='mutual'>
                <RelationshipList type='mutualUsers' />
              </Tabs.Content>
            )}
          </Tabs>
        </GQLRenderer>
      </CommonDialogContent>
    </CommonDialog>
  );
}

function RelationshipsCard() {
  const currentUser = useCurrentUser();

  const { state: profile } = useGeneralContext<IProfile>();
  const { canViewProfile } = useCanViewProfile();

  const [option, setOption] = useState('');
  const [isOpen, setOpen] = useState(false);

  const { isBlocked } = useRelationshipStatus();

  const onOpen = (value: string) => {
    // Not following and account is protected =>  shouldn't be allowed to see
    if (!canViewProfile || isBlocked) {
      return;
    }

    setOption(value);
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  return (
    <DialogTabContextProvider value={{ isOpen, onOpen, onClose, option }}>
      <VStack
        w='100%'
        px={{ '@bp1': 0, '@bp3': 4 }}
        pt={{ '@bp1': 4, '@bp3': 4 }}
        pb={{ '@bp1': 4, '@bp3': 5 }}
        borderColor='base100'
        css={{
          '@bp1': {
            borderBottomWidth: 0,
          },
          '@bp3': {
            borderBottomWidth: 1,
          },
        }}
      >
        <RelationshipSummary />
        {currentUser && profile.username !== currentUser.username && (
          <MutualFollowers />
        )}
        <RelationshipDialog />
      </VStack>
    </DialogTabContextProvider>
  );
}
RelationshipsCard.displayName = 'RelationshipsCard';

export default RelationshipsCard;
