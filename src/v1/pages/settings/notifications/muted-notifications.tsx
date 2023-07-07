import { HeaderLayout } from '../../../layouts';
import { Head, SettingCheckbox } from '../../../components';
import { Heading, VStack } from '@holdr-ui/react';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function MutedNotificationsSettingsPage() {
  return (
    <>
      <Head
        title='Muted notifications'
        description='Filter your notifications based on what you want to receive.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout
        title='Muted notifications'
        backLink={prefix(
          RootSettingsPath,
          Paths.setting.notifications_filters,
        )}
      >
        <VStack px={4} gap={5}>
          <Heading as='h2' size={4} weight={500}>
            Mute notifications from people
          </Heading>
          <VStack gap={5}>
            <SettingCheckbox heading="Who don't follow you" />
            <SettingCheckbox heading="Who haven't confirmed their email" />
            <SettingCheckbox heading="Who haven't confirmed their phone number" />
          </VStack>
        </VStack>
      </HeaderLayout>
    </>
  );
}
MutedNotificationsSettingsPage.displayName =
  'MutedNotificationsSettingsPage';

export default MutedNotificationsSettingsPage;
