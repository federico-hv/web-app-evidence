import { Box, Heading, Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head } from '../../components';

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
          <Heading as='h1' size={3} weight={500}>
            Recommended Artists
          </Heading>
          <Box h='2px' w='full' bgColor='base100' />
          <Heading as='h1' size={3} weight={500}>
            Recommended Channels
          </Heading>
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
NotificationsPage.displayName = 'NotificationsPage';
export default NotificationsPage;
