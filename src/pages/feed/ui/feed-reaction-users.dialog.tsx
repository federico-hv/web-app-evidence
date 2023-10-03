import {
  Error,
  IReturnMany,
  Loader,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useGeneralContext,
} from '../../../shared';
import {
  Box,
  Dialog,
  Heading,
  HStack,
  Icon,
  Tabs,
  VStack,
} from '@holdr-ui/react';
import {
  FeedReactionFetchType,
  GET_FEED_REACTION_USERS,
  IFeedReactionUser,
  useFeedContext,
} from '../../../features';
import { useQuery } from '@apollo/client';

function ReactionUsers({ type }: { type: FeedReactionFetchType }) {
  const { feedId } = useFeedContext();

  const { loading, data, error } = useQuery<
    { feedReactionUsers: IReturnMany<IFeedReactionUser> },
    { type: FeedReactionFetchType; id: string }
  >(GET_FEED_REACTION_USERS, {
    variables: { id: feedId, type: type },
    fetchPolicy: 'network-only',
  });

  const readable: Record<FeedReactionFetchType, string> = {
    all: 'any sentiment',
    excited: 'excitement',
    indifferent: 'indifference',
    love: 'love',
    sad: 'sadness',
  };

  return (
    <Error hasError={!!error} errorEl={<Box>Error</Box>}>
      <Loader loading={loading} h={20}>
        {data && data.feedReactionUsers.count > 0 ? (
          <VStack>
            {data.feedReactionUsers.data.map((item) => (
              // <UserWithRelationshipAction
              //   key={item.user.id}
              //   data={item.user}
              //   onClose={() => update(undefined)}
              // />
              <Box key={item.user.id}>{item.user.username}</Box>
            ))}
          </VStack>
        ) : (
          <TextGroup items='center'>
            <TextGroupHeading>No reaction yet</TextGroupHeading>
            <TextGroupSubheading size={2} color='base400' weight={500}>
              Nobody has expressed {readable[type]} for this feed yet.
            </TextGroupSubheading>
          </TextGroup>
        )}
      </Loader>
    </Error>
  );
}

function FeedReactionUsersDialog() {
  const { state, update } = useGeneralContext();

  return (
    <Dialog
      ariaDescribedBy='create-post-dialog__title'
      isOpen={!!state}
      onOpen={() => update('reactions')}
      onClose={() => update(undefined)}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          h={{ '@bp1': '100vh', '@bp3': '80vh' }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 3 }}
          w={{ '@bp1': '100vw', '@bp3': '450px' }}
          t={{ '@bp1': '69px', '@bp3': 0 }}
        >
          <Dialog.Header
            display={{ '@bp1': 'flex', '@bp3': 'none' }}
            py={3}
            css={{ flexShrink: 0 }}
            borderBottom={2}
            borderColor='base100'
          >
            <Heading size={3} weight={500} casing='uppercase'>
              Reactions
            </Heading>
          </Dialog.Header>
          <Dialog.Body pt={{ '@bp3': 4 }} mt={{ '@bp1': 48, '@bp3': 0 }}>
            <Tabs defaultValue='all'>
              <Tabs.List
                variant='link'
                css={{
                  position: 'sticky',
                  blur: '12px',
                  zIndex: 11,
                  py: '0',
                  '& button': { height: '$7', minWidth: 'unset', flex: 1 },
                  '@bp1': { t: '50px' },
                  '@bp3': { t: '0px' },
                }}
              >
                <Tabs.Trigger value='all'>All</Tabs.Trigger>
                <Tabs.Trigger value='love'>
                  <HStack items='center' gap={3}>
                    <Icon name='heart-outline' />
                    Likes
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value='excited'>
                  <HStack items='center' gap={3}>
                    <Icon name='emotion-happy-outline' />
                    Excited
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value='sad'>
                  <HStack items='center' gap={3}>
                    <Icon name='emotion-sad-outline' />
                    Sad
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value='indifferent'>
                  <HStack items='center' gap={3}>
                    <Icon name='emotion-unhappy-outline' />
                    Indifferent
                  </HStack>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value='all'>
                <ReactionUsers type='all' />
              </Tabs.Content>
              <Tabs.Content value='love'>
                <ReactionUsers type='love' />
              </Tabs.Content>
              <Tabs.Content value='excited'>
                <ReactionUsers type='excited' />
              </Tabs.Content>
              <Tabs.Content value='sad'>
                <ReactionUsers type='sad' />
              </Tabs.Content>
              <Tabs.Content value='indifferent'>
                <ReactionUsers type='indifferent' />
              </Tabs.Content>
            </Tabs>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
FeedReactionUsersDialog.displayName = 'FeedReactionUsersDialog';

export default FeedReactionUsersDialog;
