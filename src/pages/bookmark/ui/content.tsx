import { FeedCard, useBookmarksSuspenseQuery } from '../../../features';
import { FlatList } from '../../../tmp/flat-list';
import { useParams } from 'react-router-dom';

function Content() {
  const { id } = useParams();

  const { data } = useBookmarksSuspenseQuery({ id: id ?? 'all' });

  return (
    <FlatList
      className='thin-scrollbar'
      w='100%'
      direction='vertical'
      overflowY='auto'
      h='calc(100% - 56px)'
      gap={4}
      p={2}
      css={{ paddingInlineEnd: '$3' }}
      data={data.bookmarks.edges}
      renderItem={(item) => (
        <FeedCard key={item.node.id} data={item.node.feed} />
      )}
      keyExtractor={(item) => item.node.id}
    />
  );
}
Content.displayName = 'Content';

export default Content;
