import {
  FeedCard,
  FeedFilterTypeEnum,
  useTrendingFeedsQuery,
} from '../../../features';
import { Error, Loader } from '../../../shared';
import { Alert, AlertContent, AlertDescription } from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';

function Feeds({ filter }: { filter: FeedFilterTypeEnum }) {
  const { loading, error, data } = useTrendingFeedsQuery({ filter });

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
        {data && data.trendingFeeds.edges.length > 0 && (
          <FlatList
            gap={6}
            direction='vertical'
            data={data.trendingFeeds.edges}
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
Feeds.displayName = 'Feeds';

export default Feeds;
