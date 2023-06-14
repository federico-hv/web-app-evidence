import { HeaderLayout } from 'layouts';
import { Head, SettingCheckbox } from 'components';
import { Box } from '@holdr-ui/react';
import { Paths } from '../../../shared';

function ProtectAndTaggingSettingsPage() {
  return (
    <>
      <Head
        title='Protection'
        description='Manage whether other users can view your information.'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <HeaderLayout title='Protection'>
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
