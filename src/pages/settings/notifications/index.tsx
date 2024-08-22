import { VStack } from '@holdr-ui/react';
import { EmailNotificationsList, FilterNotificationsList } from './ui';
import { GQLRenderer, Head } from '../../../shared';

function SettingsNotificationsPage() {
  return (
    <GQLRenderer>
      <Head
        prefix='Settings - '
        title='Notifications'
        description='Customize the notifications you receive from Holdr and how you receive notifications.'
      />
      <VStack gap={8}>
        <FilterNotificationsList />
        <EmailNotificationsList />
      </VStack>
    </GQLRenderer>
  );
}
SettingsNotificationsPage.displayName = 'SettingsNotificationsPage';

export default SettingsNotificationsPage;
