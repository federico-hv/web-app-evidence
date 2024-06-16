import UserProfileHeader from './user-profile.header';
import { useCurrentUser } from '../../../features';
import { Navigate, useParams } from 'react-router-dom';
import {
  GQLRenderer,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
} from '../../../shared';
import { ProfileProvider } from '../shared';
import { ContentLayout, ContentLayoutMain } from '../../../layout';

function UserProfileTabs() {
  const { username } = useParams();

  const currentUser = useCurrentUser();

  if (currentUser.role === 'artist' && username === currentUser.username) {
    return <Navigate to={`/artist/${currentUser.username}`} replace />;
  }

  return (
    <GQLRenderer>
      <ProfileProvider>
        <ContentLayout>
          <ContentLayoutMain>
            <RadialSurface w='100%' p={4} radius={4}>
              <UserProfileHeader />
              <RoutingTabs flex={1}>
                <RoutingTabsHeader
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.10)'
                >
                  <RoutingTabsList gap={1}>
                    <RoutingTabsTrigger
                      to='bio'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Bio
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      to='bid-history'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Bid History
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      to='watchlist'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Watchlist
                    </RoutingTabsTrigger>
                  </RoutingTabsList>
                </RoutingTabsHeader>
                <RoutingTabsContent h='full' />
              </RoutingTabs>
            </RadialSurface>
          </ContentLayoutMain>
        </ContentLayout>
      </ProfileProvider>
    </GQLRenderer>
  );
}
UserProfileTabs.displayName = 'UserProfileTabs';

export default UserProfileTabs;
