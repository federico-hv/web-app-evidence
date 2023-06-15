import { HeaderLayout } from 'layouts';
import { Head, SettingCheckbox } from 'components';
import { Box } from '@holdr-ui/react';
import { Paths } from '../../../shared';
import { useLocation } from 'react-router-dom';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';

function ProtectAndTaggingSettingsPage() {
  // useful way of checking what the prev path was and whether to go back there or to the default root
  const { state } = useLocation();
  let to = prefix(RootSettingsPath, Paths.setting.protection_and_tagging);
  if (state) {
    to = state.prevPath;
  }
  return (
    <>
      <Head
        title='Protection'
        description='Manage whether other users can view your posts, likes and other activity.'
        url={to}
      />
      <HeaderLayout title='Protection' backLink={to}>
        <Box p={4} borderBottom={2} borderColor='base100'>
          <SettingCheckbox
            heading='Protect your account'
            subheading='When selected, only users that follow you will be allowed to see your likes, posts and account information.'
          />
        </Box>
      </HeaderLayout>
    </>
  );
}
ProtectAndTaggingSettingsPage.displayName =
  'ProtectAndTaggingSettingsPage';

export default ProtectAndTaggingSettingsPage;
