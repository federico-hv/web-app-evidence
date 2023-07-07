import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { ContentBox, Head, RecommendationListsGroup } from '../../components';

function NotificationsPage() {
  return (
    <>
      <Head
        title='Notifications'
        description="See what's happening around your, mentions and announcements."
      />
      <ContentLayout>
        <ContentLayoutMain>
          <ContentBox>Nothing to display</ContentBox>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
NotificationsPage.displayName = 'NotificationsPage';
export default NotificationsPage;
