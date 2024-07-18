import {
  Text,
  HStack,
  Switch,
  VStack,
  Heading,
  Checkbox,
} from '@holdr-ui/react';
import { Head, Paths, prefix, RootSettingsPath } from '../../../../shared';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function EmailFiltersSettingsPage() {
  return (
    <>
      <Head
        title='Email filters'
        description='Filter the notifications that you get on your email.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <SettingsHeaderLayout
        title='Filters'
        backLink={prefix(
          RootSettingsPath,
          Paths.setting.notifications_preferences,
        )}
      >
        <HStack
          p={4}
          borderBottom={1}
          borderColor='rgba(152, 152, 255, 0.10)'
          justify='space-between'
          items='center'
        >
          <Text>Email notifications</Text>
          <Switch />
        </HStack>
        <VStack p={4}>
          <Heading as='h2' size={4} weight={400}>
            Related to you
          </Heading>
          <VStack mt={4}>
            <HStack justify='space-between'>
              <Text as='label' id='new-notifications-title'>
                New notifications
              </Text>
              <Checkbox
                colorTheme='white500'
                labelledBy='new-notifications-title'
              />
            </HStack>
          </VStack>
        </VStack>
      </SettingsHeaderLayout>
    </>
  );
}
EmailFiltersSettingsPage.displayName = 'EmailFiltersSettingsPage';

export default EmailFiltersSettingsPage;
