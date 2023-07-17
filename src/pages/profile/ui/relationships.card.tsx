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
  IUser,
  Loader,
  TextGroup,
  TextGroupSubheading,
  useDialogTabContext,
} from '../../../shared';
import { useParams } from 'react-router-dom';
import {
  RelationshipList,
  GET_RELATIONSHIP_COUNT,
  useRelationshipUsers,
} from '../../../features';

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
          <HStack>
            <TextGroup onClick={() => onOpen('followers')} gap={1}>
              <TextGroupSubheading size={4} weight={600}>
                {data.followers.total}
              </TextGroupSubheading>
              <TextGroupSubheading weight={500} color='base400'>
                Followers
              </TextGroupSubheading>
            </TextGroup>
            <TextGroup onClick={() => onOpen('following')} gap={1}>
              <TextGroupSubheading size={4} weight={600}>
                {data.following.total}
              </TextGroupSubheading>
              <TextGroupSubheading weight={500} color='base400'>
                Following
              </TextGroupSubheading>
            </TextGroup>
            <TextGroup onClick={() => onOpen('memberships')} gap={1}>
              <TextGroupSubheading size={4} weight={600}>
                0
              </TextGroupSubheading>
              <TextGroupSubheading weight={500} color='base400'>
                Memberships
              </TextGroupSubheading>
            </TextGroup>
          </HStack>
        )}
      </Loader>
    </Error>
  );
}

function getMutualFollowersText(users: IUser[], total = 0): string {
  if (total > 2) {
    return `Followed by ${users[0].displayName}, ${
      users[1].displayName
    } and ${total - 2}.`;
  }
  return `Followed by ${users[0].displayName} and ${users[1].displayName}.`;
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
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();

  return (
    <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content w={450}>
          <Dialog.Body pt={4}>
            <Tabs defaultValue={option}>
              <Tabs.List
                css={{
                  py: '0',
                  '& button': { minWidth: 'unset', flex: 1 },
                }}
                variant='link'
              >
                <Tabs.Trigger value='followers'>Followers</Tabs.Trigger>
                <Tabs.Trigger value='following'>Following</Tabs.Trigger>
                <Tabs.Trigger value='memberships'>
                  Memberships
                </Tabs.Trigger>
                <Tabs.Trigger value='mutual'>Mutual</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value='followers'>
                <RelationshipList
                  username={username}
                  type='followers'
                  onClose={onClose}
                />
              </Tabs.Content>
              <Tabs.Content value='following'>
                <RelationshipList
                  username={username}
                  type='following'
                  onClose={onClose}
                />
              </Tabs.Content>
              <Tabs.Content value='mutual'>
                <RelationshipList
                  username={username}
                  type='mutualUsers'
                  onClose={onClose}
                />
              </Tabs.Content>
              <Tabs.Content value='memberships'>Coming soon</Tabs.Content>
            </Tabs>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function RelationshipsCard() {
  const [option, setOption] = useState('');
  const [isOpen, setOpen] = useState(false);

  const onOpen = (value: string) => {
    setOption(value);
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  return (
    <DialogTabContextProvider value={{ isOpen, onOpen, onClose, option }}>
      <VStack
        w='100%'
        pb={5}
        pt={4}
        px={4}
        borderBottom={2}
        borderColor='base100'
      >
        <Summary />
        <MutualFollowers />
        <RelationshipDialog />
      </VStack>
    </DialogTabContextProvider>
  );
}
RelationshipsCard.displayName = 'RelationshipsCard';

export default RelationshipsCard;
