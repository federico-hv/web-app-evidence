import { useParams } from 'react-router-dom';
import { FollowItem, useGetFollowing } from '../../../../features';
import { Fragment } from 'react';
import { Loader } from '../../../../shared';
import { FlatList } from '../../../../tmp/flat-list';

function FollowingListPage() {
  const { username } = useParams();

  const { loading, error, data } = useGetFollowing(username || '');

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && (
        <FlatList
          mt={4}
          h={480}
          overflowY='auto'
          className='thin-scrollbar'
          direction='vertical'
          gap={4}
          data={data.following.edges}
          renderItem={(data) => <FollowItem data={data.node} />}
          keyExtractor={({ node }) => node.id}
        />
      )}
    </Loader>
  );
}
FollowingListPage.displayName = 'FollowingListPage';

export default FollowingListPage;
