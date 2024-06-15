import { useParams } from 'react-router-dom';
import { FollowItem, useGetFollowers } from '../../../../features';
import { Fragment } from 'react';
import { Loader } from '../../../../shared';
import { FlatList } from '../../../../tmp/flat-list';

function FollowersListPage() {
  const { username } = useParams();

  const { loading, error, data } = useGetFollowers(username || '');

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && (
        <FlatList
          mt={4}
          h={450}
          overflowY='auto'
          className='thin-scrollbar'
          direction='vertical'
          gap={4}
          data={data.followers.edges}
          renderItem={(data) => <FollowItem data={data.node} />}
          keyExtractor={({ node }) => node.id}
        />
      )}
    </Loader>
  );
}
FollowersListPage.displayName = 'FollowersListPage';

export default FollowersListPage;
