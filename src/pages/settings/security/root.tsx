import { Box } from '@holdr-ui/react';
import { Head, Paths, prefix, useMenuNavigate } from '../../../shared';
import { SettingItem } from '../../../features';
import { PageHeader } from '../root';

export const RootSettingsPath = `/${Paths.settings}/`;
function SecuritySettingsPage() {
  const { goto } = useMenuNavigate();
  return (
    <>
      <Head
        title='Security and account accesss'
        description='See account info like your phone number and email.'
        url={prefix(RootSettingsPath, Paths.setting.account_info)}
      />
      <Box>
        <PageHeader
          title='Security and account access'
          onBack={goto.settings}
        />
        <SettingItem
          path={prefix(RootSettingsPath, Paths.setting.account_security)}
          icon='lock-outline'
          heading='Security'
          subheading='Manage your account security.'
        />
        <SettingItem
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
