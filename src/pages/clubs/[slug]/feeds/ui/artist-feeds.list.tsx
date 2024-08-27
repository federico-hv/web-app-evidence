import { Fragment } from 'react';
import { Loader } from '../../../../../shared';
import { FeedCard, useFeedsQuery } from '../../../../../features';
import { FlatList } from '../../../../../tmp/flat-list';
import { useParams } from 'react-router-dom';
import { VStack } from '@holdr-ui/react';

function ArtistFeedsList() {
  const { slug } = useParams();

  const { loading, data, error } = useFeedsQuery({ slug });

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      <VStack gap={5}>
        {/*<CreatePost />*/}
        {data && data.feeds.edges.length > 0 ? (
          <FlatList
            gap={6}
            direction='vertical'
            data={data.feeds.edges}
            renderItem={({ node }) => (
              <FeedCard showPin key={node.id} data={node} />
            )}
            keyExtractor={({ node }) => node.id}
          />
        ) : (
          <Fragment />
        )}
      </VStack>
    </Loader>
  );
}
ArtistFeedsList.displayName = 'ArtistFeedsList';

export default ArtistFeedsList;
