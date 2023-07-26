import { useQuery } from '@apollo/client';
import {
  ArticleCard,
  CreatePost,
  FeedCard,
  FeedsReturnModel,
  GET_FEEDS,
  useCurrentUser,
} from '../../../features';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../../shared';
import { Alert, Tabs, VStack } from '@holdr-ui/react';

function Feeds({ type = 'all' }: { type: 'all' | 'article' | 'post' }) {
  const currentUser = useCurrentUser();
  const { loading, data, error } = useQuery<
    { feeds: FeedsReturnModel },
    { type: string }
  >(GET_FEEDS, {
    pollInterval: 1000,
    fetchPolicy: 'network-only',
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
          <VStack gap={5} pb={6}>
            {currentUser && currentUser.role === 'artist' && (
              <CreatePost />
            )}
            {data.feeds.data.map((item) => (
              <SwitchConditional key={item.id}>
                <SwitchConditionalCase on={item.type === 'post'}>
                  <FeedCard data={item} />
                </SwitchConditionalCase>
                <SwitchConditionalCase on={item.type === 'article'}>
                  <ArticleCard data={item} />
                </SwitchConditionalCase>
              </SwitchConditional>
            ))}
          </VStack>
        )}
      </Loader>
    </Error>
  );
}

function FeedTabs() {
  return (
    <Tabs defaultValue='all'>
      <Tabs.List css={{ py: '$3', px: '$1' }}>
        <Tabs.Trigger value='all'>All</Tabs.Trigger>
        <Tabs.Trigger value='holdr'>Holdr</Tabs.Trigger>
        <Tabs.Trigger value='news'>News</Tabs.Trigger>
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
