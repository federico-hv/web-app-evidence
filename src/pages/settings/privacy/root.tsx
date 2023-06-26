import { Box } from '@holdr-ui/react';
import { PageHeader } from '../root';
import { Head, SettingButton } from 'components';
import { Paths } from 'shared';
import { prefix } from 'utilities';
import { RootSettingsPath } from '../security/root';
import { useMenuNavigate } from '../../../hooks';

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
        <SettingButton
          path={prefix(
            RootSettingsPath,
            Paths.setting.protection_and_tagging,
          )}
          heading='Protection'
          subheading='Manage whether other users can view your information.'
          icon='shield-keyhole-fill'
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.mute_and_block)}
          heading='Mute and block'
          subheading='Manage the notifications that you receive and how your receive them.'
          icon='mute-outline'
        />
      </Box>
    </>
  );
}
PrivacySettingsPage.displayName = 'PrivacySettingsPage';
export default PrivacySettingsPage;
