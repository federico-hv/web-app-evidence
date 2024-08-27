import {
  FeedCard,
  FeedFilterTypeEnum,
  useFeedsQuery,
} from '../../../features';
import { Error, Loader } from '../../../shared';
import { Alert, AlertContent, AlertDescription } from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';

function FollowingFeeds({ filter }: { filter: FeedFilterTypeEnum }) {
  const { loading, error, data } = useFeedsQuery({ filter });

  return (
    <Error
      hasError={!!error}
      errorEl={
        <Alert>
          <AlertContent>
            <AlertDescription>{error?.message}</AlertDescription>
          </AlertContent>
        </Alert>
      }
    >
      <Loader loading={loading}>
        {data && data.feeds.edges.length > 0 && (
          <FlatList
            gap={6}
            direction='vertical'
            data={data.feeds.edges}
            renderItem={({ node }) => (
              <FeedCard key={node.id} data={node} />
            )}
            keyExtractor={({ node }) => node.id}
          />
        )}
      </Loader>
    </Error>
  );
}
FollowingFeeds.displayName = 'Feeds';

export default FollowingFeeds;
