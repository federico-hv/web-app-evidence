import { HeaderLayout } from 'layouts';
import { Head } from '../../../components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function MutedSettingsPage() {
  return (
    <>
      <Head
        title='Muted accounts'
        description='See the accounts that have been muted.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout
        title='Muted accounts'
        backLink={prefix(RootSettingsPath, Paths.setting.mute_and_block)}
      ></HeaderLayout>
    </>
  );
}
MutedSettingsPage.displayName = 'MutedSettingsPage';

export default MutedSettingsPage;
