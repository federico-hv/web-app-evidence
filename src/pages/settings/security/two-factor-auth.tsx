import { Box, VStack } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, SettingCheckbox } from 'components';
import { Paths } from '../../../shared';

function TwoFactorAuthSettingsPage() {
  return (
    <>
      <Head
        title='Two-factor authentication'
        description='Help protect your account from unauthorized access by
        requiring a second authentication method in addition to your Twitter
        password. You can choose a text message, authentication app, or security key'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <HeaderLayout title='Two-factor authentication'>
        <Box px={4}>
          <VStack gap={4}>
            <SettingCheckbox
              heading='Text Message'
              subheading='Logging into Holdr will prompt a text message to be sent
                your mobile device with an authentication code.'
            />
            <SettingCheckbox
              heading='Authentication app'
              subheading='Logging into Holdr will prompt an authentication code to be
                sent to a mobile authentication app.'
            />
          </VStack>
        </Box>
      </HeaderLayout>
    </>
  );
}
TwoFactorAuthSettingsPage.displayName = 'TwoFactorAuthSettingsPage';

export default TwoFactorAuthSettingsPage;
