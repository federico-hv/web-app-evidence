import { useQuery } from '@apollo/client';
import {
  CreatePost,
  FeedsReturnModel,
  GET_FEEDS,
  useCurrentUser,
  FeedCard,
} from '../../../features';
import {
  Error,
  Loader,
  useIsBottomOf,
  useScrollDirection,
} from '../../../shared';
import { Alert, Container, Tabs, VStack } from '@holdr-ui/react';

function Feeds({ type = 'all' }: { type: 'all' | 'article' | 'post' }) {
  const currentUser = useCurrentUser();
  const { loading, data, error } = useQuery<
    { feeds: FeedsReturnModel },
    { type: string }
  >(GET_FEEDS, {
    variables: {
      type,
    },
  });

  return (
    <Error
      hasError={!!error}
      errorEl={
        <Alert>
          <Alert.Description>{error?.message}</Alert.Description>
        </Alert>
      }
    >
      <Loader loading={loading}>
        {data && (
          <Container maxWidth={600} pt={4}>
            <VStack w='100%' gap={5} pb={6}>
              {currentUser && currentUser.role === 'artist' && (
                <CreatePost />
              )}
              {data.feeds.data.map((item) => (
                <FeedCard key={item.id} data={item} />
              ))}
            </VStack>
          </Container>
        )}
      </Loader>
    </Error>
  );
}

function FeedTabs() {
  const isBottom = useIsBottomOf('#root');
  const { direction, delta } = useScrollDirection('#root');

  return (
    <Tabs defaultValue='all'>
      <Tabs.List
        css={{
          position: 'sticky',
          backgroundColor: '$clearTint500',
          blur: '12px',
          zIndex: 11,
          py: '$4',
          px: '$1',
          '& button:not(:last-child)': {
            marginRight: '$4',
          },
          '@bp1': {
            top:
              direction === 'down' && !isBottom && delta > 0 ? 0 : '56px',
          },
          '@bp3': {
            top: 65,
          },
        }}
      >
        <Container maxWidth={600}>
          <Tabs.Trigger value='all'>All</Tabs.Trigger>
          <Tabs.Trigger value='holdr'>Holdr</Tabs.Trigger>
          <Tabs.Trigger value='news'>News</Tabs.Trigger>
        </Container>
      </Tabs.List>
      <Tabs.Content value='all'>
        <Feeds type='all' />
      </Tabs.Content>
      <Tabs.Content value='holdr'>
        <Feeds type='post' />
      </Tabs.Content>
      <Tabs.Content value='news'>
        <Feeds type='article' />
      </Tabs.Content>
    </Tabs>
  );
}
FeedTabs.displayName = 'FeedTabs';

export default FeedTabs;
