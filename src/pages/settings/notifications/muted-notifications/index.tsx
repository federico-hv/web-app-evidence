import {
  Head,
  HeaderLayout,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../../shared';
import { Checkbox, Heading, HStack, Text, VStack } from '@holdr-ui/react';

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
            <HStack justify='space-between'>
              <Text as='label' id='follow-checkbox'>
                {`Who don't follow you`}
              </Text>
              <Checkbox labelledBy='follow' />
            </HStack>
            <HStack justify='space-between'>
              <Text as='label' id='email-checkbox'>
                {"Who haven't confirmed their email"}
              </Text>
              <Checkbox labelledBy='email-checkbox' />
            </HStack>
            <HStack justify='space-between'>
              <Text as='label' id='phone-checkbox'>
                {"Who haven't confirmed their phone number"}
              </Text>
              <Checkbox labelledBy='phone-checkbox' />
            </HStack>
          </VStack>
        </VStack>
      </HeaderLayout>
    </>
  );
}
MutedNotificationsSettingsPage.displayName =
  'MutedNotificationsSettingsPage';

export default MutedNotificationsSettingsPage;
