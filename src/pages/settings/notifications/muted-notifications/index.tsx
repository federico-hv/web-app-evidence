import { Head, Paths, prefix, RootSettingsPath } from '../../../../shared';
import { Checkbox, Heading, HStack, Text, VStack } from '@holdr-ui/react';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function MutedNotificationsSettingsPage() {
  return (
    <>
      <Head
        title='Muted notifications'
        description='Filter your notifications based on what you want to receive.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <SettingsHeaderLayout
        title='Muted notifications'
        backLink={prefix(
          RootSettingsPath,
          Paths.setting.notifications_filters,
        )}
      >
        <VStack p={4} gap={5}>
          <Heading as='h2' size={4} weight={400}>
            Mute notifications from people
          </Heading>
          <VStack pl={4} gap={6}>
            <HStack cursor='pointer' as='label' justify='space-between'>
              <Text id='follow-checkbox'>{`Who don't follow you`}</Text>
              <Checkbox colorTheme='white500' labelledBy='follow' />
            </HStack>
            <HStack cursor='pointer' as='label' justify='space-between'>
              <Text id='email-checkbox'>
                {"Who haven't confirmed their email"}
              </Text>
              <Checkbox
                colorTheme='white500'
                labelledBy='email-checkbox'
              />
            </HStack>
            <HStack cursor='pointer' as='label' justify='space-between'>
              <Text id='phone-checkbox'>
                {"Who haven't confirmed their phone number"}
              </Text>
              <Checkbox
                colorTheme='white500'
                labelledBy='phone-checkbox'
              />
            </HStack>
          </VStack>
        </VStack>
      </SettingsHeaderLayout>
    </>
  );
}
MutedNotificationsSettingsPage.displayName =
  'MutedNotificationsSettingsPage';

export default MutedNotificationsSettingsPage;
