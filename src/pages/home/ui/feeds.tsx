import {
  FeedCard,
  FeedFilterTypeEnum,
  useFeedsQuery,
} from '../../../features';
import { Error, Loader } from '../../../shared';
import { Alert, AlertContent, AlertDescription } from '@holdr-ui/react';
import { FeedViewType } from '../shared';
import { FlatList } from '../../../tmp/flat-list';

function Feeds({
  filter,
}: {
  filter: FeedFilterTypeEnum;
  type: FeedViewType;
}) {
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
Feeds.displayName = 'Feeds';

export default Feeds;
