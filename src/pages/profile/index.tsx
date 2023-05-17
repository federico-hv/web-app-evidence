import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { RecommendationListsGroup } from '../../components';

function ProfilePage() {
  return (
    <ContentLayout>
      <ContentLayoutMain>
        <Text role='contentinfo'>Profile page</Text>
      </ContentLayoutMain>
      <ContentLayoutAside>
        <RecommendationListsGroup />
      </ContentLayoutAside>
    </ContentLayout>
  );
}
ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
