import { useEffect } from 'react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import {
  RecommendationListsGroup,
  HeaderSm,
  ProfileHeader,
  ProfileContent,
} from '../../components';

function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <HeaderSm />
      <ContentLayout>
        <ContentLayoutMain>
          <ProfileHeader />
          <ProfileContent />
        </ContentLayoutMain>
        <ContentLayoutAside>
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
