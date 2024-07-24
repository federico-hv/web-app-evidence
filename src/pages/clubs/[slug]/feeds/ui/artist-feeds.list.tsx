import { Fragment } from 'react';
import { EmptyMessage, Loader } from '../../../../../shared';
import { FeedCard, useFeedsQuery } from '../../../../../features';
import { FlatList } from '../../../../../tmp/flat-list';

interface ArtistFeedsListProps {
  /** The artist's username*/
  slug: string;
}

function ArtistFeedsList({ slug }: ArtistFeedsListProps) {
  const { loading, data, error } = useFeedsQuery({ slug });

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && data.feeds.edges.length > 0 ? (
        <FlatList
          gap={6}
          direction='vertical'
          data={data.feeds.edges}
          renderItem={({ node }) => <FeedCard key={node.id} data={node} />}
          keyExtractor={({ node }) => node.id}
        />
      ) : (
        <EmptyMessage subtitle='No posts yet.' />
      )}
    </Loader>
  );
}
ArtistFeedsList.displayName = 'ArtistFeedsList';

export default ArtistFeedsList;
