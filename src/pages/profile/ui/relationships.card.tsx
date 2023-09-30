import { useState } from 'react';
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
  Error,
  Loader,
  TextGroup,
  TextGroupSubheading,
  useDialogTabContext,
  useGeneralContext,
  UserNamesGroup,
} from '../../../shared';
import { useParams } from 'react-router-dom';
import {
  RelationshipList,
  GET_RELATIONSHIP_COUNT,
  useRelationshipUsers,
  useCurrentUser,
} from '../../../features';
import {
  getMutualFollowersText,
  IProfile,
  useCanViewProfile,
} from '../shared';
import millify from 'millify';

function Summary() {
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

  const { loading, data, error } = useRelationshipUsers(
    'mutualUsers',
    username || '',
  );

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading}>
        {data && data.mutualUsers!.total > 0 && (
          <HStack
            onClick={() => onOpen('mutual')}
            mt={5}
            items='center'
            gap={3}
          >
            <AvatarGroup size='xs'>
              {data.mutualUsers!.users.map((item) => (
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
                {getMutualFollowersText(
                  data.mutualUsers?.users || [],
                  data.mutualUsers?.total,
                )}
              </Text>
            </Box>
          </HStack>
        )}
      </Loader>
    </Error>
  );
}

function RelationshipDialog() {
  const { width } = useWindowSize();
  const { state: profile } = useGeneralContext<IProfile>();
  const currentUser = useCurrentUser();
  const { option, ...dialogContext } = useDialogTabContext();

  return (
    <CommonDialog
      {...dialogContext}
      onOpen={() => dialogContext.onOpen(option)}
    >
      {width && width <= 768 && (
        <CommonDialogHeader justify='flex-start'>
          <UserNamesGroup
            displayName={profile.displayName}
            username={profile.username}
          />
        </CommonDialogHeader>
      )}
      <CommonDialogContent>
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
            {currentUser && profile.username !== currentUser.username && (
              <Tabs.Trigger value='mutual'>
                <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
                  Mutual
                </Text>
              </Tabs.Trigger>
            )}
          </Tabs.List>
          <Tabs.Content value='followers'>
            <RelationshipList
              username={profile.username}
              type='followers'
              onClose={dialogContext.onClose}
              emptyMessage={{
                title: 'No followers',
                subtitle: 'Not yet followed by any users.',
              }}
            />
          </Tabs.Content>
          <Tabs.Content value='following'>
            <RelationshipList
              username={profile.username}
              type='following'
              onClose={dialogContext.onClose}
              emptyMessage={{
                title: 'No followers',
                subtitle: 'Not yet following any users.',
              }}
            />
          </Tabs.Content>
          {currentUser && profile.username !== currentUser.username && (
            <Tabs.Content value='mutual'>
              <RelationshipList
                username={profile.username}
                type='mutualUsers'
                onClose={dialogContext.onClose}
                emptyMessage={{
                  title: 'No mutual users',
                  subtitle:
                    'None of the users you follow are currently following this user.',
                }}
              />
            </Tabs.Content>
          )}
          {/*<Tabs.Content value='memberships'>Coming soon</Tabs.Content>*/}
        </Tabs>
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

  const onOpen = (value: string) => {
    // Not following and account is protected =>  shouldn't be allowed to see
    if (!canViewProfile) {
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
            borderBottom: 0,
          },
          '@bp3': {
            borderBottom: 1,
          },
        }}
      >
        <Summary />
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
