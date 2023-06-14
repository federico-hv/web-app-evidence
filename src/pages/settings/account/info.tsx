import { Box, VStack } from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { HeaderLayout } from 'layouts';
import { Error, Head, SettingButton, Loader } from 'components';
import { prefix } from 'utilities';
import { IAccountInfo, Paths } from 'shared';
import { GET_ACCOUNT_INFO } from 'lib';
import { RootSettingsPath } from '../security/root';
import { capitalize } from 'lodash';

function AccountInfoPage() {
  const { loading, error, data } = useQuery<{ accountInfo: IAccountInfo }>(
    GET_ACCOUNT_INFO,
  );

  return (
    <Error hasError={!!error} errorEl={<Box>{error?.message}</Box>}>
      <Head
        title='Account information'
        description='See account info like your phone number and email.'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <Loader loading={loading} h={75}>
        {data && (
          <HeaderLayout title='Account information'>
            <VStack borderBottom={2} borderColor='base100'>
              <SettingButton
                path={prefix(RootSettingsPath, Paths.setting.username)}
                heading='Username'
                subheading={`@${data.accountInfo.username}`}
              />
              <SettingButton
                path={prefix(RootSettingsPath, Paths.setting.phone)}
                heading='Phone'
                subheading={`${data.accountInfo.phone}`}
              />
              <SettingButton
                path={prefix(RootSettingsPath, Paths.setting.email)}
                heading='Email'
                subheading={`${data.accountInfo.email}`}
              />
            </VStack>

            <VStack borderBottom={2} borderColor='base100'>
              <SettingButton
                path={prefix(
                  RootSettingsPath,
                  Paths.setting.protection_and_tagging,
                )}
                heading='Protected account'
                subheading={data.accountInfo.protected ? 'Yes' : 'No'}
              />
            </VStack>

            <VStack borderBottom={2} borderColor='base100'>
              <SettingButton
                path={prefix(RootSettingsPath, Paths.setting.country)}
                heading='Country'
                subheading={capitalize(data.accountInfo.country)}
              />
              <SettingButton
                path={prefix(RootSettingsPath, Paths.setting.gender)}
                heading='Gender'
                subheading={data.accountInfo.gender}
              />
              <SettingButton
                path={prefix(RootSettingsPath, Paths.setting.birthday)}
                heading='Birthday'
                subheading={`${dayjs(data.accountInfo.birthday).format(
                  'MMM DD, YYYY',
                )}`}
              />
            </VStack>
          </HeaderLayout>
        )}
      </Loader>
    </Error>
  );
}
AccountInfoPage.displayName = 'AccountInfoPage';

export default AccountInfoPage;
