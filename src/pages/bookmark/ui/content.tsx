import { useParams } from 'react-router-dom';
import { FeedCard, useGetBookmarks } from '../../../features';
import { FlatList } from '../../../tmp/flat-list';

function Content() {
  const params = useParams();
  const { data } = useGetBookmarks({
    id: params.id,
    fetchPolicy: 'network-only',
  });

  return (
    <FlatList
      className='thin-scrollbar'
      w='100%'
      direction='vertical'
      overflowY='auto'
      h='calc(100% - 56px)'
      gap={4}
      p={{ '@bp1': 2, '@bp3': 4 }}
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
