import { VStack } from '@holdr-ui/react';
import { EmailNotificationsList, FilterNotificationsList } from './ui';

function SettingsNotificationsPage() {
  return (
    <VStack gap={8}>
      <FilterNotificationsList />
      <EmailNotificationsList />
    </VStack>
  );
}
SettingsNotificationsPage.displayName = 'SettingsNotificationsPage';

export default SettingsNotificationsPage;
