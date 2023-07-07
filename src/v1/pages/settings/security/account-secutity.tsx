import { Box, Heading, Text, VStack } from '@holdr-ui/react';
import { HeaderLayout } from '../../../layouts';
import { Paths } from '../../../shared';
import { Head, SettingButton } from '../../../components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from './root';

function AccountSecuritySettingsPage() {
  return (
    <>
      <Head
        title='Security'
        description=''
        url={prefix(RootSettingsPath, Paths.setting.account_security)}
      />
      <HeaderLayout
        title='Security'
        backLink={prefix(RootSettingsPath, Paths.setting.security)}
      >
        <VStack borderBottom={2} borderColor='base100'>
          <Box px={4}>
            <Heading as='h2' size={3} color='base600'>
              Two-factor authentication
            </Heading>
            <Text size={1} as='sm' color='base400'>
              Help protect your account from unauthorized access by
              requiring a second authentication method in addition to your
              Twitter password. You can choose a text message,
              authentication app, or security key.
            </Text>
            <a href=''>
              <Text size={1} as='sm' color='secondary400'>
                Learn more
              </Text>
            </a>
          </Box>
          <Box pb={2} pt={5}>
            <SettingButton
              path={prefix(RootSettingsPath, Paths.setting.login_security)}
              heading='Two-factor authentication'
            />
          </Box>
        </VStack>
      </HeaderLayout>
    </>
  );
}
AccountSecuritySettingsPage.displayName = 'AccountSecuritySettingsPage';

export default AccountSecuritySettingsPage;
