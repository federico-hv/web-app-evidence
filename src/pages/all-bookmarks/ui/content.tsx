import { VStack } from '@holdr-ui/react';
import { FeedCard, useGetBookmarks } from '../../../features';

function Content() {
  const { data } = useGetBookmarks({ fetchPolicy: 'cache-and-network' });

  return (
    <VStack p={4} gap={5} mb={{ '@bp1': 58, '@bp3': 0 }}>
      {data.bookmarks.edges.map((item) => (
        <FeedCard key={item.node.id} data={item.node.feed} />
      ))}
    </VStack>
  );
}
Content.displayName = 'Content';

export default Content;
