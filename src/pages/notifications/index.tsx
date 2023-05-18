import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head, RecommendationListsGroup } from 'components';

function NotificationsPage() {
  return (
    <>
      <Head
        title='Notifications'
        description="See what's happening around your, mentions and announcements."
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Notifications page</Text>
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
