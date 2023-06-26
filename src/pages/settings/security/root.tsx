import { Box } from '@holdr-ui/react';
import { PageHeader } from '../root';
import { Paths } from 'shared';
import { prefix } from 'utilities';
import { Head, SettingButton } from 'components';
import { useMenuNavigate } from '../../../hooks';

export const RootSettingsPath = `/${Paths.settings}/`;
function SecuritySettingsPage() {
  const { goto } = useMenuNavigate();
  return (
    <>
      <Head
        title='Settings and account accesss'
        description='See account info like your phone number and email.'
        url={prefix(RootSettingsPath, Paths.setting.account_info)}
      />
      <Box>
        <PageHeader
          title='Security and account access'
          onBack={goto.settings}
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.account_security)}
          icon='lock-outline'
          heading='Security'
          subheading='Manage your account security.'
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.connected_accounts)}
          icon='collections-outline'
          heading='Connected accounts'
          subheading='Manage Google, Apple and Spotify accounts connected to your Holdr account.'
        />
      </Box>
    </>
  );
}
SecuritySettingsPage.displayName = 'SecuritySettingsPage';
export default SecuritySettingsPage;
