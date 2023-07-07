import { VStack } from '@holdr-ui/react';
import { capitalize } from 'lodash';
import dayjs from 'dayjs';
import { HeaderLayout } from '../../../layouts';
import { Head, SettingButton } from '../../../components';
import { prefix } from '../../../utilities';
import { Paths } from '../../../shared';
import { RootSettingsPath } from '../security/root';
import { useContext } from 'react';
import { AccountInfoContext } from '../../../contexts';

function AccountInfoPage() {
  const { data } = useContext(AccountInfoContext);
  return (
    <>
      <Head
        title='Account information'
        description='See account info like your phone number and email.'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <HeaderLayout
        title='Account information'
        backLink={prefix(RootSettingsPath, Paths.setting.account)}
      >
        <VStack borderBottom={2} borderColor='base100'>
          <SettingButton
            path={prefix(RootSettingsPath, Paths.setting.username)}
            heading='Username'
            subheading={`@${data.username}`}
          />
          <SettingButton
            path={prefix(RootSettingsPath, Paths.setting.phone)}
            heading='Phone'
            subheading={`${data.phone}`}
          />
          <SettingButton
            path={prefix(RootSettingsPath, Paths.setting.email)}
            heading='Email'
            subheading={`${data.email}`}
          />
        </VStack>

        <VStack borderBottom={2} borderColor='base100'>
          <SettingButton
            path={prefix(
              RootSettingsPath,
              Paths.setting.protection_and_tagging,
            )}
            heading='Protected account'
            subheading={data.protected ? 'Yes' : 'No'}
          />
        </VStack>

        <VStack borderBottom={2} borderColor='base100'>
          <SettingButton
            path={prefix(RootSettingsPath, Paths.setting.country)}
            heading='Country'
            subheading={capitalize(data.country)}
            capitalize={{ subheading: true }}
          />
          <SettingButton
            path={prefix(RootSettingsPath, Paths.setting.gender)}
            heading='Gender'
            subheading={data.gender}
          />
          <SettingButton
            path={prefix(RootSettingsPath, Paths.setting.birthday)}
            heading='Birthday'
            subheading={`${dayjs(data.birthday).format('MMMM D, YYYY')}`}
          />
        </VStack>
      </HeaderLayout>
    </>
  );
}
AccountInfoPage.displayName = 'AccountInfoPage';

export default AccountInfoPage;
