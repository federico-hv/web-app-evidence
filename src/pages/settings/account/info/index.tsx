import { VStack } from '@holdr-ui/react';
import { SettingItem, useAccountInfo } from '../../../../features';
import { Head, Paths, prefix, RootSettingsPath } from '../../../../shared';
import { capitalize, upperCase } from 'lodash';
import dayjs from 'dayjs';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function AccountInfoPage() {
  const { data } = useAccountInfo();
  return (
    <>
      <Head
        title='Account information'
        description='See account info like your phone number and email.'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <SettingsHeaderLayout
        title='Account information'
        backLink={prefix(RootSettingsPath, Paths.setting.account)}
      >
        <VStack borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)'>
          <SettingItem
            path={prefix(RootSettingsPath, Paths.setting.username)}
            heading='Username'
            subheading={`@${data.username}`}
          />
          <SettingItem
            path={prefix(RootSettingsPath, Paths.setting.phone)}
            heading='Phone'
            subheading={`${data.phone}`}
          />
          <SettingItem
            path={prefix(RootSettingsPath, Paths.setting.email)}
            heading='Email'
            subheading={`${data.email}`}
          />
        </VStack>

        <VStack borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)'>
          <SettingItem
            path={prefix(
              RootSettingsPath,
              Paths.setting.protection_and_tagging,
            )}
            heading='Protected account'
            subheading={data.protected ? 'Yes' : 'No'}
          />
        </VStack>

        <VStack borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)'>
          <SettingItem
            path={prefix(RootSettingsPath, Paths.setting.country)}
            heading='Country'
            subheading={upperCase(data.country)}
            capitalize={{ subheading: true }}
          />
          <SettingItem
            path={prefix(RootSettingsPath, Paths.setting.gender)}
            heading='Gender'
            subheading={data.gender}
          />
          <SettingItem
            path={prefix(RootSettingsPath, Paths.setting.birthday)}
            heading='Birthday'
            subheading={`${dayjs(data.birthday).format('MMMM D, YYYY')}`}
          />
        </VStack>
      </SettingsHeaderLayout>
    </>
  );
}
AccountInfoPage.displayName = 'AccountInfoPage';

export default AccountInfoPage;
