import { VStack } from '@holdr-ui/react';
import { useParams } from 'react-router-dom';
import { FeedCard, useGetBookmarks } from '../../../features';

function Content() {
  const params = useParams();
  const { data } = useGetBookmarks({
    id: params.id,
    fetchPolicy: 'network-only',
  });

  return (
    <VStack p={4} gap={5}>
      {data.bookmarks.edges.map((item) => (
        <FeedCard key={item.node.id} data={item.node.feed} />
      ))}
    </VStack>
  );
}
Content.displayName = 'Content';

export default Content;
