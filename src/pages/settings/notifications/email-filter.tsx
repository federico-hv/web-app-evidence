import { Text, HStack, Switch, VStack, Heading } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, SettingCheckbox } from 'components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

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
            <SettingCheckbox disabled heading='New notifications' />
          </VStack>
        </VStack>
      </HeaderLayout>
    </>
  );
}
EmailFiltersSettingsPage.displayName = 'EmailFiltersSettingsPage';

export default EmailFiltersSettingsPage;
