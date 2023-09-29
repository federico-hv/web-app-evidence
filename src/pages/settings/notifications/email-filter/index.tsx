import {
  Text,
  HStack,
  Switch,
  VStack,
  Heading,
  Checkbox,
} from '@holdr-ui/react';
import { Head, Paths, prefix, RootSettingsPath } from '../../../../shared';
import { HeaderLayout } from '../../../../layout';

function EmailFiltersSettingsPage() {
  return (
    <>
      <Head
        title='Email filters'
        description='Filter the notifications that you get on your email.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout
        title='Filters'
        backLink={prefix(
          RootSettingsPath,
          Paths.setting.notifications_preferences,
        )}
      >
        <HStack
          px={4}
          pb={4}
          borderBottom={2}
          borderColor='base100'
          justify='space-between'
          items='center'
        >
          <Text>Email notifications</Text>
          <Switch />
        </HStack>
        <VStack p={4} borderBottom={2} borderColor='base100'>
          <Heading
            as='h2'
            size={3}
            weight={600}
            css={{ fontSize: 'large' }}
          >
            Related to you
          </Heading>
          <VStack mt={4}>
            <HStack justify='space-between'>
              <Text as='label' id='new-notifications-title'>
                New notifications
              </Text>
              <Checkbox labelledBy='new-notifications-title' />
            </HStack>
          </VStack>
        </VStack>
      </HeaderLayout>
    </>
  );
}
EmailFiltersSettingsPage.displayName = 'EmailFiltersSettingsPage';

export default EmailFiltersSettingsPage;
