import { Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, Loader, Error, AccountInfoForm } from 'components';
import { Paths } from 'shared';
import { useUpdateAccountInfo, useAccountInfo } from 'lib';
import { isEqual } from 'lodash';
import { prefix } from 'utilities';
import { AccountInfoContextProvider } from 'contexts';
import { RootSettingsPath } from '../security/root';
import dayjs from 'dayjs';

function BirthdaySettingPage() {
  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useAccountInfo();

  const {
    loading: loadingMutation,
    error: errorMutation,
    onSubmit,
    onFinish,
  } = useUpdateAccountInfo();

  return (
    <Error
      hasError={!!errorQuery || !!errorMutation}
      errorEl={<Box>{errorQuery?.message || errorMutation?.message}</Box>}
    >
      <Head
        title='Update birthday'
        description='Change your birthday.'
        url={`/${RootSettingsPath}/${Paths.setting.birthday}`}
      />
      <Loader loading={loadingQuery}>
        {data && (
          <HeaderLayout
            title='Birthday'
            backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
          >
            <AccountInfoContextProvider
              value={{
                loading: loadingMutation,
                disabled: (values) =>
                  isEqual(
                    dayjs(values.birthday).format('YYYY-MM-DD'),
                    dayjs(data.accountInfo.birthday).format('YYYY-MM-DD'),
                  ),
                data: data.accountInfo,
                name: 'birthday',
              }}
            >
              <AccountInfoForm
                initialValues={{
                  birthday: dayjs(data.accountInfo.birthday).format(
                    'YYYY-MM-DD',
                  ),
                }}
                onSubmit={onSubmit}
                onFinish={onFinish}
              />
            </AccountInfoContextProvider>
          </HeaderLayout>
        )}
      </Loader>
    </Error>
  );
}
BirthdaySettingPage.displayName = 'BirthdaySettingPage';

export default BirthdaySettingPage;
