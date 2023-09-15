import { VStack } from '@holdr-ui/react';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@apollo/client';
import { FeedCard, GET_BOOKMARKS, IBookmark } from '../../../features';
import { IConnection, IPaginationParams } from '../../../shared';

function Content() {
  const params = useParams();
  const { data } = useSuspenseQuery<
    { bookmarks: IConnection<IBookmark, number> },
    { id: string; params?: IPaginationParams<number> }
  >(GET_BOOKMARKS, {
    variables: {
      id: params.id || '',
    },
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
