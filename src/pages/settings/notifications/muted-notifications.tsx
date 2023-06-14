import { HeaderLayout } from 'layouts';
import { SettingCheckbox } from 'components';
import { Heading, VStack } from '@holdr-ui/react';

function MutedNotificationsSettingsPage() {
  return (
    <HeaderLayout title='Muted notifications'>
      <VStack px={4} gap={4}>
        <Heading as='h2' size={3} weight={500} css={{ fontSize: 'large' }}>
          Mute notifications from people
        </Heading>
        <VStack gap={4}>
          <SettingCheckbox heading="Who don't follow you" />
          <SettingCheckbox heading="Who haven't confirmed their email" />
          <SettingCheckbox heading="Who haven't confirmed their phone number" />
        </VStack>
      </VStack>
    </HeaderLayout>
  );
}
MutedNotificationsSettingsPage.displayName =
  'MutedNotificationsSettingsPage';

export default MutedNotificationsSettingsPage;
