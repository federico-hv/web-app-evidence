import { useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Dialog,
  HStack,
  Tabs,
  Text,
  VStack,
} from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import {
  DialogTabContextProvider,
  Error,
  Loader,
  TextGroup,
  TextGroupSubheading,
  useDialogTabContext,
  useProfile,
} from '../../../shared';
import { useParams } from 'react-router-dom';
import {
  RelationshipList,
  GET_RELATIONSHIP_COUNT,
  useRelationshipUsers,
  useCurrentUser,
} from '../../../features';
import { getMutualFollowersText, useCanViewProfile } from '../shared';
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
            {/*<TextGroup*/}
            {/*  w={{ '@bp1': 'fit-content', '@bp3': '100%' }}*/}
            {/*  onClick={() => onOpen('memberships')}*/}
            {/*  direction={{ '@bp1': 'horizontal', '@bp3': 'vertical' }}*/}
            {/*  gap={{ '@bp1': 2, '@bp3': 1 }}*/}
            {/*>*/}
            {/*  <TextGroupSubheading*/}
            {/*    size={{ '@bp1': 2, '@bp3': 4 }}*/}
            {/*    weight={600}*/}
            {/*  >*/}
            {/*    0*/}
            {/*  </TextGroupSubheading>*/}
            {/*  <TextGroupSubheading*/}
            {/*    size={{ '@bp1': 2, '@bp3': 4 }}*/}
            {/*    weight={500}*/}
            {/*    color='base400'*/}
            {/*  >*/}
            {/*    Memberships*/}
            {/*  </TextGroupSubheading>*/}
            {/*</TextGroup>*/}
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
  const { username } = useParams();
  const { profile } = useProfile();
  const currentUser = useCurrentUser();
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          h={{ '@bp1': '100vh', '@bp3': '80vh' }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 3 }}
          w={{ '@bp1': '100vw', '@bp3': '450px' }}
        >
          <Dialog.Header
            display={{ '@bp1': 'flex', '@bp3': 'none' }}
            css={{ flexShrink: 0 }}
          >
            <TextGroup gap={0}>
              <TextGroup.Heading size={3} weight={500}>
                {profile.displayName}
              </TextGroup.Heading>
              <TextGroup.Subheading size={2} color='base400' weight={500}>
                @{profile.username}
              </TextGroup.Subheading>
            </TextGroup>
          </Dialog.Header>
          <Dialog.Body pt={4} mt={{ '@bp1': 68, '@bp3': 0 }}>
            <Tabs defaultValue={option}>
              <Tabs.List
                css={{
                  py: '0',
                  '& button': { height: '$7', minWidth: 'unset', flex: 1 },
                }}
                variant='link'
              >
                <Tabs.Trigger value='followers'>Followers</Tabs.Trigger>
                <Tabs.Trigger value='following'>Following</Tabs.Trigger>
                {/*<Tabs.Trigger value='memberships'>*/}
                {/*  Memberships*/}
                {/*</Tabs.Trigger>*/}
                {currentUser &&
                  profile.username !== currentUser.username && (
                    <Tabs.Trigger value='mutual'>Mutual</Tabs.Trigger>
                  )}
              </Tabs.List>
              <Tabs.Content value='followers'>
                <RelationshipList
                  username={username}
                  type='followers'
                  onClose={onClose}
                  emptyMessage={{
                    title: 'No followers',
                    subtitle: 'Not yet followed by any users.',
                  }}
                />
              </Tabs.Content>
              <Tabs.Content value='following'>
                <RelationshipList
                  username={username}
                  type='following'
                  onClose={onClose}
                  emptyMessage={{
                    title: 'No followers',
                    subtitle: 'Not yet following any users.',
                  }}
                />
              </Tabs.Content>
              {currentUser &&
                profile.username !== currentUser.username && (
                  <Tabs.Content value='mutual'>
                    <RelationshipList
                      username={username}
                      type='mutualUsers'
                      onClose={onClose}
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
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function RelationshipsCard() {
  const currentUser = useCurrentUser();

  const { profile } = useProfile();
  const { loading, canViewProfile } = useCanViewProfile();

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
    <Loader loading={loading}>
      <DialogTabContextProvider
        value={{ isOpen, onOpen, onClose, option }}
      >
        <VStack
          w='100%'
          px={{ '@bp1': 3, '@bp3': 4 }}
          pt={{ '@bp1': 3, '@bp3': 4 }}
          pb={{ '@bp1': 4, '@bp3': 5 }}
          borderBottom={2}
          borderColor='base100'
        >
          <Summary />
          {currentUser && profile.username !== currentUser.username && (
            <MutualFollowers />
          )}
          <RelationshipDialog />
        </VStack>
      </DialogTabContextProvider>
    </Loader>
  );
}
RelationshipsCard.displayName = 'RelationshipsCard';

export default RelationshipsCard;
