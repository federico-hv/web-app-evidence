import { SettingItem } from '../../../features';
import {
  Head,
  Paths,
  prefix,
  RootSettingsPath,
  useMenuNavigate,
} from '../../../shared';
import { Box } from '@holdr-ui/react';
import { PageHeader } from '../root';

function PrivacySettingsPage() {
  const { goto } = useMenuNavigate();
  return (
    <>
      <Head
        title='Privacy and safety'
        description=''
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <Box>
        <PageHeader title='Privacy and safety' onBack={goto.settings} />
        <SettingItem
          path={prefix(
            RootSettingsPath,
            Paths.setting.protection_and_tagging,
          )}
          heading='Protection'
          subheading='Manage whether other users can view your information.'
          icon='shield-keyhole-fill'
        />
        <SettingItem
          path={prefix(RootSettingsPath, Paths.setting.manage_users)}
          heading='Manage users'
          subheading='Manage who can view your content and account.'
          icon='user-outline'
        />
      </Box>
    </>
  );
}
PrivacySettingsPage.displayName = 'PrivacySettingsPage';
export default PrivacySettingsPage;
