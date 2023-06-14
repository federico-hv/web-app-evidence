import { HeaderLayout } from 'layouts';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';
import { Head } from '../../../components';

function BlockedSettingsPage() {
  return (
    <>
      <Head
        title='Blocked accounts'
        description='See the accounts that have been blocked.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout title='Blocked accounts'></HeaderLayout>
    </>
  );
}
BlockedSettingsPage.displayName = 'BlockedSettingsPage';

export default BlockedSettingsPage;
