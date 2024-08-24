import { useLocation, useParams } from 'react-router-dom';
import { FollowItem, useGetFollowers } from '../../../../features';
import { Fragment } from 'react';
import { Loader } from '../../../../shared';
import { FlatList } from '../../../../tmp/flat-list';

function FollowersListPage() {
  const { username } = useParams();

  const location = useLocation();
  const colorTheme = location.state.colorTheme;

  const { loading, error, data } = useGetFollowers(username || '');

  if (error) {
    return <Fragment />;
  }

  console.log(colorTheme);

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
          renderItem={(data) => (
            <FollowItem
              color={colorTheme === 'secondary' ? 'base800' : 'white500'}
              colorTheme={
                colorTheme === 'secondary'
                  ? {
                      follow: 'purple500',
                      following: 'purple300',
                    }
                  : undefined
              }
              data={data.node}
            />
          )}
          keyExtractor={({ node }) => node.id}
        />
      )}
    </Loader>
  );
}
FollowersListPage.displayName = 'FollowersListPage';

export default FollowersListPage;
