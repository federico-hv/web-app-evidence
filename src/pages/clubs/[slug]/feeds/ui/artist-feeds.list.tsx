import { Fragment } from 'react';
import { VStack } from '@holdr-ui/react';
import { EmptyMessage, Loader } from '../../../../../shared';
import { FeedCard, useUserFeeds } from '../../../../../features';

interface ArtistFeedsListProps {
  /** The artist's username*/
  forArtist: string;
}

function ArtistFeedsList({ forArtist }: ArtistFeedsListProps) {
  const { loading, data, error } = useUserFeeds(forArtist, 'all');

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && data.userFeeds.count > 0 ? (
        <VStack gap={6} w='full' pb={6}>
          {data.userFeeds.data.map((item) => (
            <FeedCard key={item.id} data={item} />
          ))}
        </VStack>
      ) : (
        <EmptyMessage subtitle='No posts yet.' />
      )}
    </Loader>
  );
}
ArtistFeedsList.displayName = 'ArtistFeedsList';

export default ArtistFeedsList;
