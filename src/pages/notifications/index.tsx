import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
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
          <VStack divider={<StackDivider />} gap={4}>
            <Heading as='h1' casing='uppercase' size={3} weight={500}>
              Recommended Artists
            </Heading>
            <Heading as='h1' casing='uppercase' size={3} weight={500}>
              Recommended Channels
            </Heading>
          </VStack>
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
NotificationsPage.displayName = 'NotificationsPage';
export default NotificationsPage;
