import { VStack } from '@holdr-ui/react';
import dayjs from 'dayjs';
import { HeaderLayout } from 'layouts';
import { SettingButton } from 'components';
import { prefix } from '../../../utilities';
import { Paths } from '../../../shared';
import { RootSettingsPath } from '../security/root';

const accountInfo = {
  username: 'TakDeveloper',
  phone: '+15555555555',
  email: 'takdev@gmail.com',
  country: 'Canada',
  gender: 'Male',
  birthday: dayjs().subtract(20, 'year').toDate(),
  protected: false,
};

function AccountInfoPage() {
  return (
    <HeaderLayout title='Account information'>
      <VStack borderBottom={2} borderColor='base100'>
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.username)}
          heading='Username'
          subheading={`@${accountInfo.username}`}
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.phone)}
          heading='Phone'
          subheading={`${accountInfo.phone}`}
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.email)}
          heading='Email'
          subheading={`${accountInfo.email}`}
        />
      </VStack>

      <VStack borderBottom={2} borderColor='base100'>
        <SettingButton
          path={prefix(
            RootSettingsPath,
            Paths.setting.protection_and_tagging,
          )}
          heading='Protected account'
          subheading={accountInfo.protected ? 'Yes' : 'No'}
        />
      </VStack>

      <VStack borderBottom={2} borderColor='base100'>
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.country)}
          heading='Country'
          subheading={`${accountInfo.country}`}
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.gender)}
          heading='Gender'
          subheading={`${accountInfo.gender}`}
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.birthday)}
          heading='Birth date'
          subheading={`${dayjs(accountInfo.birthday).format(
            'MMM DD, YYYY',
          )}`}
        />
      </VStack>
    </HeaderLayout>
  );
}
AccountInfoPage.displayName = 'AccountInfoPage';

export default AccountInfoPage;
