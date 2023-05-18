import { useContext, useEffect } from 'react';
import { Box } from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from 'layouts';
import {
  NotFoundContent,
  FloatingPageHeader,
  RecommendationListsGroup,
  SpinnerLoader,
  ProfilePageBanner,
  ProfilePageContent,
  ProfilePageHeader,
} from 'components';
import { GET_PROFILE } from 'lib';
import { IProfile } from 'shared';
import { AuthContext } from 'contexts';

function ProfilePage() {
  const currentUser = useContext(AuthContext).currentUser;
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        payload: { username: username, id: currentUser?.id || 'id' },
      },
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <ContentLayout>
      <ContentLayoutMain>
        {data && data.profile && (
          <FloatingPageHeader>
            <ProfilePageHeader profile={data.profile} />
          </FloatingPageHeader>
        )}
        <ProfilePageContent>
          {error ? (
            <Box py={4}>
              <NotFoundContent />
            </Box>
          ) : (
            <>
              <SpinnerLoader loading={loading}>
                {data && data.profile && (
                  <ProfilePageBanner
                    profile={data.profile}
                    currentUser={currentUser}
                  />
                )}
              </SpinnerLoader>

              <SpinnerLoader loading={loading}>
                <Box px={6}>
                  <Box pt={4} fontSize={3}>
                    🚧 {"Hol' Up, We are building!"} 🚧
                  </Box>
                </Box>
              </SpinnerLoader>
            </>
          )}
        </ProfilePageContent>
      </ContentLayoutMain>
      <ContentLayoutAside>
        <RecommendationListsGroup />
      </ContentLayoutAside>
    </ContentLayout>
  );
}
ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
